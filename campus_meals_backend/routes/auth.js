// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\routes\auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Import the database pool
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { usn, first_name, last_name, email, phone_number, password, ...otherStudentData } = req.body;

  if (!usn || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Create the student
    const studentSql = `
      INSERT INTO students (usn, first_name, last_name, email, phone_number, gender, department, year_of_study, semester, enrollment_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [studentResult] = await connection.query(studentSql, [
      usn, first_name, last_name, email, phone_number,
      otherStudentData.gender || null,
      otherStudentData.department || null,
      otherStudentData.year_of_study || null,
      otherStudentData.semester || null,
      otherStudentData.enrollment_date || new Date()
    ]);

    const newStudentId = studentResult.insertId;

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Create the auth entry (MAKE SURE YOU CREATED THE user_auth TABLE)
    const authSql = `
      INSERT INTO user_auth (student_id, email, password_hash) 
      VALUES (?, ?, ?)
    `;
    await connection.query(authSql, [newStudentId, email, password_hash]);

    await connection.commit();
    res.status(201).json({ message: 'Student registered successfully', studentId: newStudentId });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email or USN already exists' });
    }
    res.status(500).json({ error: 'Database registration failed' });
  } finally {
    connection.release();
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM user_auth WHERE email = ?', [email]);
    const authUser = rows[0];

    if (!authUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, authUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const [studentRows] = await pool.query('SELECT * FROM students WHERE student_id = ?', [authUser.student_id]);
    const student = studentRows[0];

    const payload = {
      studentId: student.student_id,
      email: student.email,
      name: `${student.first_name} ${student.last_name}`
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token: token,
      student: payload 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server login error' });
  }
});

module.exports = router;