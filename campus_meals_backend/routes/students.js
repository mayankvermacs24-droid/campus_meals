// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\routes\students.js
const express =require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/students/:studentId/profile
// Gets a student's profile information
router.get('/:studentId/profile', async (req, res) => {
  try {
    const { studentId } = req.params;
    // We don't select password hash!
    const [rows] = await pool.query('SELECT student_id, usn, first_name, last_name, email, phone_number, department, year_of_study, semester FROM students WHERE student_id = ?', [studentId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch student profile' });
  }
});


// GET /api/students/:studentId/orders
// Gets a student's order history
router.get('/:studentId/orders', async (req, res) => {
  try {
    const { studentId } = req.params;
    const [orders] = await pool.query(
      `SELECT co.*, c.canteen_name 
       FROM canteen_orders co
       JOIN canteens c ON co.canteen_id = c.canteen_id
       WHERE co.student_id = ? 
       ORDER BY co.order_date DESC`,
      [studentId]
    );
    res.json(orders);
  } catch (error)
  {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;