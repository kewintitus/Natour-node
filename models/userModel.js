const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User must have a valid email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid Email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    min: [8, 'Password must have atleast 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
