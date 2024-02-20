/*
  * User Model
  * Required: Usename, Email, Password, Boolean 2FA Value, 2FA Secret
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  is2faOn: {
    type: Boolean,
    default: false
  },
  secret: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  timestamp: true,
});

module.exports = mongoose.model('Users', userSchema);