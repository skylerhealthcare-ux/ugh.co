require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const { connectMongoDB } = require('./config/mongo');
const apiRoutes = require('./routes/api');

const app = express();

// Connect to PostgreSQL (Neon)
connectDB();

// Connect to MongoDB (for customers, OTP, waitlist)
connectMongoDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend - FIXED: pointing to correct folder
app.use(express.static(path.join(__dirname, '../ugh-website')));

// API Routes
app.use('/api', apiRoutes);

// Serve the frontend for any other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ugh-website/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
