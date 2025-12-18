// FILENAME: C:\Users\hp\Desktop\campus_meals_backend\server.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');


const authRoutes = require('./routes/auth');
const canteenRoutes = require('./routes/canteens');
const orderRoutes = require('./routes/orders');
const studentRoutes = require('./routes/students');
const adminRoutes = require('./routes/admin');


const app = express();
const PORT = process.env.PORT || 3001;



// Parse JSON request bodies
app.use(express.json());

// Enable CORS for React frontend
app.use(cors({
    origin: 'http://localhost:5173', // React frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // PATCH added
    credentials: true,
}));


app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminRoutes); 
app.use('/api/canteens', canteenRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/students', studentRoutes);


app.get('/api', (req, res) => {
    res.json({ message: "Hello from the Campus Meals backend!" });
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
