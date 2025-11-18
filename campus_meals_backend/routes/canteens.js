// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\routes\canteens.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/canteens
// Gets a list of all active canteens
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM canteens WHERE is_active = TRUE');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// GET /api/canteens/:canteenId/items
// Gets all available items for a specific canteen
router.get('/:canteenId/items', async (req, res) => {
  try {
    const { canteenId } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM canteen_items WHERE canteen_id = ? AND is_available = TRUE', 
      [canteenId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;