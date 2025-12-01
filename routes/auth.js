// routes/auth.js
// Handles user registration, login, and logout using passport-local.

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /auth/login
 */
router.get('/login', (req, res) => {
  console.log('GET /auth/login');
  res.render('auth/login');
});

/**
 * POST /auth/login
 * Standard passport middleware – this WILL respond (redirect) either way.
 */
router.post(
  '/login',
  (req, res, next) => {
    console.log('POST /auth/login body:', req.body);
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/workouts',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

/**
 * GET /auth/register
 */
router.get('/register', (req, res) => {
  console.log('GET /auth/register');
  res.render('auth/register');
});

/**
 * POST /auth/register
 */
router.post('/register', (req, res) => {
  console.log('POST /auth/register body:', req.body);

  const { username, password, email, displayName } = req.body;

  const newUser = new User({
    username,
    email,
    displayName
  });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error('Registration error:', err);
      req.flash('message', 'Registration failed: ' + err.message);
      return res.redirect('/auth/register');
    }

    console.log('Registration successful for:', user.username);
    req.flash('message', 'Registration successful. Please log in.');
    res.redirect('/auth/login');
  });
});

/**
 * GET /auth/logout
 */
router.get('/logout', (req, res, next) => {
  console.log('GET /auth/logout');
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;