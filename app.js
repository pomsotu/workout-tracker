// app.js
// Workout Tracker with local username/password auth.

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
require('./config/db');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const User = require('./models/User');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing
app.use(express.urlencoded({ extended: true }));

// Debug logger so we SEE the requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Method override & static files
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session (login sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false
  })
);

// Flash messages
app.use(flash());

// Passport-local-mongoose setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// Make currentUser + message available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash('message') || '';
  next();
});

// Routes
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');

app.use('/workouts', workoutRoutes);
app.use('/auth', authRoutes);

// Home / splash
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Workout Tracker running on port ${PORT}`);
});

module.exports = app;