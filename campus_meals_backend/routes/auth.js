// FILENAME: campus_meals_backend/routes/auth.js (FINALIZED with real income query)

const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const pool = require('../db'); 
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; 

// --- ADMIN AUTH MIDDLEWARE ---
const checkAdminAuth = async (req, res, next) => {
    const adminId = req.headers['x-admin-id']; 
    
    if (!adminId) {
        return res.status(401).json({ message: 'Authentication required. Admin ID header missing.' });
    }

    try {
        const [rows] = await pool.query('SELECT admin_id FROM Admin WHERE admin_id = ?', [adminId]);
        
        if (rows.length === 0) {
            return res.status(403).json({ message: 'Access denied. Invalid Admin ID provided.' });
        }
        
        req.user = { id: adminId, role: 'Admin' };
        next();
        
    } catch (error) {
        console.error('Database Error during Admin check:', error);
        return res.status(500).json({ message: 'Internal server error during authorization check.' });
    }
};

// --- AUTHENTICATION ROUTES ---
router.post('/register', async (req, res) => {
    const { usn, first_name, last_name, email, phone_number, password } = req.body;

    if (!usn || !first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const studentSql = `
            INSERT INTO students (usn, first_name, last_name, email, phone_number) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [studentResult] = await connection.query(studentSql, [
            usn, first_name, last_name, email, phone_number
        ]);

        const newStudentId = studentResult.insertId;

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

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
            id: student.student_id, 
            email: student.email,
            role: 'Student', 
            name: `${student.first_name} ${student.last_name}`
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: 'Login successful',
            token: token,
            role: 'Student', 
            user: payload 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server login error' });
    }
});

router.post('/staff-signin', async (req, res) => {
    const { staffId } = req.body; 

    if (!staffId) {
        return res.status(400).json({ message: 'Staff ID is required.' });
    }

    try {
        const sql = 'SELECT id FROM Staff WHERE id = ?'; 
        const [results] = await pool.query(sql, [staffId]); 
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid Staff ID. Access denied.' });
        }

        const staffMember = results[0];

        const payload = { 
            id: staffId, 
            role: 'Staff', 
            name: staffMember.name || 'Staff Member' 
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

        res.status(200).json({ 
            message: 'Staff sign-in successful',
            token: token, 
            role: 'Staff',
            user: payload
        });

    } catch (error) {
        console.error('Database error during staff sign-in:', error);
        res.status(500).json({ message: 'Server error. Could not verify ID.' });
    }
});

router.post('/admin-signin', async (req, res) => {
    const { adminId } = req.body; 

    if (!adminId) {
        return res.status(400).json({ message: 'Admin ID is required.' });
    }

    try {
        const sql = 'SELECT admin_id, name FROM Admin WHERE admin_id = ?'; 
        const [results] = await pool.query(sql, [adminId]); 
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid Admin ID. Access denied.' });
        }

        const adminUser = results[0];

        const payload = { 
            id: adminId, 
            role: 'Admin', 
            name: adminUser.name || 'Admin User'
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 

        res.status(200).json({ 
            message: 'Admin sign-in successful',
            token: token, 
            role: 'Admin',
            user: payload
        });

    } catch (error) {
        console.error('Database error during admin sign-in:', error);
        res.status(500).json({ message: 'Server error. Could not verify ID.' });
    }
});


// -------------------------------------------------------------------------
// ADMIN DASHBOARD ROUTES
// -------------------------------------------------------------------------

router.use('/admin', checkAdminAuth); 

// --- ROUTE 5: Menu Management (GET /api/auth/admin/menu) ---
router.get('/admin/menu', async (req, res) => {
    try {
        const [menu] = await pool.query('SELECT menu_id, name, type, messTime, is_active FROM Menu_Items');
        res.json(menu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ message: 'Failed to fetch menu items.' });
    }
});

// --- ROUTE 6: Menu Management (POST /api/auth/admin/menu/add) ---
router.post('/admin/menu/add', async (req, res) => {
    const { name, type, messTime } = req.body;
    if (!name || !type || !messTime) {
        return res.status(400).json({ message: 'Missing required menu fields.' });
    }
    
    try {
        const result = await pool.query(
            'INSERT INTO Menu_Items (name, type, messTime, is_active) VALUES (?, ?, ?, 1)',
            [name, type, messTime]
        );
        res.status(201).json({ 
            message: 'Menu item added successfully', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Failed to add menu item.' });
    }
});

// --- ROUTE 7: Student Details (GET /api/auth/admin/students) ---
router.get('/admin/students', async (req, res) => {
    try {
        const [students] = await pool.query('SELECT student_id, first_name, last_name, email, usn FROM students'); 
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({});
    }
});

// --- ROUTE 8: Event Approvals (GET /api/auth/admin/events) ---
router.get('/admin/events', async (req, res) => {
    try {
        const [events] = await pool.query(
            `SELECT event_id, name, date, description, status 
             FROM Events 
             WHERE status = 'Pending'`
        );
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({});
    }
});

// --- ROUTE 9: Monthly Income Analysis (GET /api/auth/admin/income) ---
router.get('/admin/income', async (req, res) => {
    try {
        // Query to aggregate income data from a conceptual Canteen_Orders table
        // This will return an empty array if Canteen_Orders is empty, avoiding dummy data.
        const incomeSql = `
            SELECT
                DATE_FORMAT(order_date, '%M') AS month,
                SUM(CASE WHEN order_type = 'Mess' THEN amount ELSE 0 END) AS messIncome,
                SUM(CASE WHEN order_type = 'Canteen' THEN amount ELSE 0 END) AS canteenIncome
            FROM Canteen_Orders 
            GROUP BY month
            ORDER BY MIN(order_date) DESC 
            LIMIT 3
        `;
        const [incomeData] = await pool.query(incomeSql);
        res.json(incomeData);
    } catch (error) {
        // If the table Canteen_Orders does not exist, return an empty array or handle error gracefully
        console.error('Error fetching income data:', error);
        res.status(500).json({});
    }
});

// --- ROUTE 10: DELETE Menu Item (DELETE /api/auth/admin/menu/:menuId) ---
router.delete('/admin/menu/:menuId', async (req, res) => {
    const { menuId } = req.params;
    
    try {
        const [result] = await pool.query('DELETE FROM Menu_Items WHERE menu_id = ?', [menuId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        res.json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Failed to delete menu item.' });
    }
});

// --- ROUTE 11: Event Approval/Rejection (PATCH /api/auth/admin/events/:eventId) ---
router.patch('/admin/events/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { status } = req.body; 

    if (status !== 'Approved' && status !== 'Rejected') {
        return res.status(400).json({ message: 'Invalid status provided. Must be Approved or Rejected.' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE Events SET status = ? WHERE event_id = ? AND status = "Pending"',
            [status, eventId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found or already processed.' });
        }

        res.json({ message: `Event ${eventId} successfully ${status.toLowerCase()}.` });
    } catch (error) {
        console.error('Error updating event status:', error);
        res.status(500).json({ message: 'Failed to update event status.' });
    }
});


module.exports = router;