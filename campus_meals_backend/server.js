// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\server.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express'); // <-- Only one copy
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const canteenRoutes = require('./routes/canteens');
const orderRoutes = require('./routes/orders');
const studentRoutes = require('./routes/students');

// Setup Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Setup Middleware
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // Enable parsing of JSON request bodies

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/canteens', canteenRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/students', studentRoutes);

// Health check route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Campus Meal backend!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});