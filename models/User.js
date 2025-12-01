// models/User.js
// User model for local username/password authentication.

const mongoose = require('mongoose');
const rawPlugin = require('passport-local-mongoose');

// Handle both CommonJS and ESM export styles
const passportLocalMongoose =
  typeof rawPlugin === 'function' ? rawPlugin : rawPlugin.default;

const userSchema = new mongoose.Schema({
  email: { type: String },
  displayName: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Adds username, hash, salt, and helper methods (.register, .authenticate)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);