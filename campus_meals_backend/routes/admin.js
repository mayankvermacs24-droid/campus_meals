// FILENAME: campus_meals_backend/routes/admin.js

const express = require('express');
const router = express.Router();
const db = require('../db'); 


router.use(async (req, res, next) => {
    const adminId = req.headers['x-admin-id'];

    if (!adminId) {
        return res.status(401).json({ message: 'Admin ID missing' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM Admin WHERE admin_id = ?',
            [adminId]
        );

        if (rows.length === 0) {
            return res.status(403).json({ message: 'Unauthorized admin' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Admin verification failed' });
    }
});
router.get('/students', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                student_id,
                first_name,
                last_name,
                email,
                usn
            FROM students
            ORDER BY first_name
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});




router.get('/events', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT event_id, name, description, date
            FROM events
            WHERE status = 'Pending'
            ORDER BY date
        `);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});


router.patch('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        await db.query(`
            UPDATE events
            SET status = ?
            WHERE event_id = ?
        `, [status, id]);

        res.json({ message: `Event ${status}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update event' });
    }
});



router.get('/income', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                DATE_FORMAT(order_date, '%Y-%m') AS month,
                SUM(total_amount) AS canteenIncome,
                0 AS messIncome
            FROM canteen_orders
            WHERE payment_status = 'Completed'
            GROUP BY month
            ORDER BY month DESC
        `);

        // frontend expects numbers
        const formatted = rows.map(r => ({
            month: r.month,
            canteenIncome: Number(r.canteenIncome || 0),
            messIncome: Number(r.messIncome || 0)
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch income data' });
    }
});

module.exports = router;
