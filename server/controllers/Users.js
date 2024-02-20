/*
  * This file contains the controller for the Users model.
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const asyncHandler = require('../middlewares/asyncMiddleware');
const Users = require('../models/Users');

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.ACCESS_SECRET,
    {expiresIn: '15m'}
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.REFRESH_SECRET,
    {expiresIn: '15m'}
  );
};

const users = {
  // Get All Users
  getAllUsers: asyncHandler( async (req, res) => {
    res.status(200).json({msg: 'Get All Users'});
  }),
  // Register User
  register: asyncHandler( async (req, res) => {
    const user = req.body; // Get user info from request body

    const exists = await Users.findOne({email: user.email}); // Check if user already exists     
    if (exists) return res.status(400).json({msg: 'User already exists!'}); // If exists, return error message
    
    const hash = await bcrypt.hash(user.password, 10); //Hash password with 10 salt rounds

    const newUser = new Users({ // Create new user object
      username: user.username,
      email: user.email,
      password: hash,
    });

    // If not exists, create user
    await Users
      .create(newUser)
      .then(() => {
        res.status(200).json({msg: `User ${user.username} created successfully!`});
      });
  }),
  // Login User
  login: asyncHandler( async (req, res) => {
    res.status(200).json({msg: 'Login User'});
  }),
};

module.exports = users;