const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Middlewares
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Load Routes
const api1Routes = require('./routes/api1');
const api2Routes = require('./routes/api2');
const api3Routes = require('./routes/api3');
const authRoutes = require('./routes/auth');

// Route Middlewares
app.use('/api1', api1Routes);
app.use('/api2', api2Routes);
app.use('/api3', api3Routes);
app.use('/auth', authRoutes);

// Server (for development)
app.listen(3000, () => {
    console.log('HTTP Server running on port 3000');
});

