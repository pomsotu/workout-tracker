// All CRUD routes for Workout model

const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET all workouts (List)
router.get('/', async (req, res) => {
    const workouts = await Workout.find().sort({ date: -1 });
    res.render('workouts/list', { workouts });
});

// NEW workout form
router.get('/new', (req, res) => {
    res.render('workouts/new');
});

module.exports = router;
