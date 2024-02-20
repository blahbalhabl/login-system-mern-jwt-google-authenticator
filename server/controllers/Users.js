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
    res.status(200).json({msg: 'Register User'});
  }),
  // Login User
  login: asyncHandler( async (req, res) => {
    res.status(200).json({msg: 'Login User'});
  }),
};

module.exports = users;