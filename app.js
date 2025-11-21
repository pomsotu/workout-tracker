// app.js
// Main entry point for the Workout Tracker application

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
require('./config/db'); // Connect to MongoDB

const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // Support PUT & DELETE in forms

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const workoutRoutes = require('./routes/workouts');
app.use('/workouts', workoutRoutes);

// Home/splash route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Workout Tracker running on port ${PORT}`);
});