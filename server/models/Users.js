/**
 * @api {model} Users User
 * @apiGroup Models 
 * @description User Model
 * @requires mongoose
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
    unique: true,
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
  secret: {
    type: String,
    required: false,
    default: null,
    max: 1024,
    min: 6
  }, 
},
{
  timestamps: true,
});

module.exports = mongoose.model('Users', userSchema);