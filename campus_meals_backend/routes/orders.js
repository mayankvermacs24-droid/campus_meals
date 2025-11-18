// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\routes\orders.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// POST /api/orders
// Creates a new canteen order. This is a TRANSACTION.
router.post('/', async (req, res) => {
  const { student_id, canteen_id, total_amount, payment_method, items } = req.body;
  
  if (!student_id || !canteen_id || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Create the main order
    const orderSql = `
      INSERT INTO canteen_orders (student_id, canteen_id, total_amount, payment_method, payment_status, order_status)
      VALUES (?, ?, ?, ?, 'Completed', 'Placed')
    `;
    const [orderResult] = await connection.query(orderSql, [
      student_id, canteen_id, total_amount, payment_method
    ]);
    
    const newOrderId = orderResult.insertId;

    // 2. Insert all items into 'order_items'
    const orderItemsSql = `
      INSERT INTO order_items (order_id, item_id, quantity, unit_price, subtotal)
      VALUES ?
    `;
    
    const orderItemsData = items.map(item => [
      newOrderId,
      item.item_id,
      item.quantity,
      item.unit_price,
      item.quantity * item.unit_price
    ]);

    await connection.query(orderItemsSql, [orderItemsData]);
    
    await connection.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrderId });

  } catch (error) {
    await connection.rollback();
    console.error('Order transaction failed:', error);
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    connection.release();
  }
});

module.exports = router;