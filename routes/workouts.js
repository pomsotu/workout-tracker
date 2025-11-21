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

// CREATE new workout (handles form submission)
router.post('/', async (req, res) => {
    try {
        const { name, muscleGroup, sets, reps, date } = req.body;

        // Create a new workout document
        await Workout.create({
            name,
            muscleGroup,
            sets,
            reps,
            date
        });

        // Redirect back to the list of workouts
        res.redirect('/workouts');
    } catch (err) {
        console.error('Error creating workout:', err);
        res.send('Error creating workout');
    }
});

// EDIT form for a specific workout
router.get('/:id/edit', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.send('Workout not found');
        }
        res.render('workouts/edit', { workout });
    } catch (err) {
        console.error('Error loading edit form:', err);
        res.send('Error loading edit form');
    }
});

// UPDATE a specific workout
router.put('/:id', async (req, res) => {
    try {
        const { name, muscleGroup, sets, reps, date } = req.body;

        await Workout.findByIdAndUpdate(req.params.id, {
            name,
            muscleGroup,
            sets,
            reps,
            date
        });

        res.redirect('/workouts');
    } catch (err) {
        console.error('Error updating workout:', err);
        res.send('Error updating workout');
    }
});

// DELETE confirmation page
router.get('/:id/delete', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.send('Workout not found');
        }
        res.render('workouts/delete', { workout });
    } catch (err) {
        console.error('Error loading delete confirmation:', err);
        res.send('Error loading delete confirmation');
    }
});

// DELETE a specific workout
router.delete('/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/workouts');
    } catch (err) {
        console.error('Error deleting workout:', err);
        res.send('Error deleting workout');
    }
});

module.exports = router;
