// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\db.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const mysql = require('mysql2/promise'); // <-- Only one copy

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Successfully connected to the MySQL database!');
    connection.release();
  })
  .catch(error => {
    console.error('❌ Error connecting to the database:', error);
  });

module.exports = pool;