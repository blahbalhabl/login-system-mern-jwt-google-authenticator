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
    {expiresIn: `${process.env.ACCESS_EXPIRES}s`}
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.REFRESH_SECRET,
    {expiresIn: `${process.env.REFRESH_EXPIRES}s`}
  );
};

const users = {
  /* <=============== Get All Users ===============> */
  getAllUsers: asyncHandler( async (req, res) => {
    const users = await Users.find().select('-_id -password -is2faOn').lean().exec(); // Get all users from database
    if (!users) return res.status(400).json({msg: 'No users found!'}); // If no users found, return error message
    res.status(200).json({msg: 'Success', users}); // If users found, return success message and users
  }),
  /* <=============== Register User ===============> */
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
  /* <=============== Login User ===============> */
  login: asyncHandler( async (req, res) => {
    const creds = req.body; // Get user info from request body

    const user = await Users.findOne({email: creds.email});
    if (!user) return res.status(400).json({msg: 'User not found!'}); // If user not found, return error message

    const isMatch = bcrypt.compare(creds.password, user.password); // Compare password
    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials!'}); // If password is incorrect, return error message

    const accessToken = createAccessToken(user); // Create access token
    const refreshToken = createRefreshToken(user); // Create refresh token

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      path: '/api',
      // expires: new Date(Date.now() + 1000 * 60 * 30), // Set refresh token expiration to 30 minutes
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Set refresh token expiration to 7 days
      expires: new Date(Date.now() + 1000 * process.env.REFRESH_EXPIRES), // Set refresh token expiration to 20 seconds
      secure: process.env.NODE_ENV === 'production' ? true : false,
    }); // Set refresh token in cookie

    res.status(200).json({msg: 'Login successful', accessToken, refreshToken}); // Return success message and tokens
  }),
};

module.exports = users;