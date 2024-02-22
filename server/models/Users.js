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
  role: {
    type: Number,
    default: 1001
  },
  is2faOn: {
    type: Boolean,
    default: false
  },
  secret: {
    type: String,
    required: false,
    max: 1024,
    min: 6
  }, 
},
{
  timestamps: true,
});

module.exports = mongoose.model('Users', userSchema);