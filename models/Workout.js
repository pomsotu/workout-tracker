// Defines the Workout schema and model for MongoDB

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Workout', workoutSchema);
