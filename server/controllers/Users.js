/**
 * @description - User Controller
 * @requires dotenv
 * @requires bcrypt
 * @requires asyncHandler
 * @requires createAccessToken
 * @requires createRefreshToken
 * @requires generateSecret
 * @requires generateQRCode
 * @requires UsersModel
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const asyncHandler = require('../services/AsyncHandler');
const { createAccessToken, createRefreshToken } = require('../services/AuthTokens');
const { generateSecret, generateQRCode, speakeasyVerify } = require('../services/Secure');
const Users = require('../models/Users');

const users = {
  /* <=============== Get All Users ===============> */
  getAllUsers: asyncHandler( async (req, res) => {
    const users = await Users.find().select('-_id -password -secret').lean().exec(); // Get all users from database

    if (!users) return res.status(400).json({msg: 'No users found!'}); // If no users found, return error message 

    res.status(200).json({msg: 'Success', users}); // If users found, return success message and users
  }),
  /* <=============== Register User ===============> */
  register: asyncHandler( async (req, res) => {
    const user = req.body; // Get user info from request body

    const exists = await Users.findOne({email: user.email}); // Check if user already exists
    if (exists) return res.status(400).json({msg: 'User already exists'}); // If user exists, return error message
    
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
        res.status(200).json({msg: `User ${newUser.username} created successfully!`});
      });
  }),
  /* <=============== Login User ===============> */
  login: asyncHandler( async (req, res) => {
    const creds = req.body; // Get user info from request body
    const isLoggedIn = req.cookies?._refresh; // Check if user is already logged in
    if (isLoggedIn) return res.status(400).json({msg: 'User already logged in!'}); // If logged in, return error

    const user = await Users.findOne({email: creds.email});
    if (!user) return res.status(400).json({msg: 'User not found!'}); // If user not found, return error 

    const isMatch = bcrypt.compare(creds.password, user.password); // Compare password
    if (!isMatch) return res.status(400).json({msg: 'Incorrect Password!'}); // If password is incorrect, return error message

    if (user?.secret && !creds.otp) return res.status(200).json({msg: 'two-factor otp required'}); // If 2FA is enabled, return 2FA required message

    if (user?.secret && creds.otp) { // If 2FA is enabled and OTP is provided
      const verified = speakeasyVerify(creds.otp, user.secret); // Verify OTP
      if (!verified) return res.status(400).json({msg: 'Invalid Code'}); // If OTP is invalid, return error message
    };

    const accessToken = createAccessToken(user); // Create access token
    const refreshToken = createRefreshToken(user); // Create refresh token

    // Create a new user object to return without password and with access token
    const userPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: accessToken,
    };

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      path: '/api',
      // expires: new Date(Date.now() + 1000 * 60 * 30), // Set refresh token expiration to 30 minutes
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Set refresh token expiration to 7 days
      expires: new Date(Date.now() + 1000 * process.env.REFRESH_EXPIRES), // Set refresh token expiration to 40 seconds
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    }); // Set refresh token in cookie

    res.status(200).json({msg: 'Login successful', user: userPayload}); // Return success message and token
  }),
  /* <=============== Logout User ===============> */
  logout: asyncHandler( async (req, res) => {
    const isLoggedIn = req.cookies._refresh; // Check if user is already logged in
    if (!isLoggedIn) return res.status(400).json({msg: 'User not logged in!'}); // If not logged in, return error message
    res.clearCookie('_refresh', {path: '/api'}); // Clear refresh token from cookie
    res.status(200).json({msg: 'Logout successful'}); // Return success message
  }),
  /* <=============== Creating a Two Factor Auth Secret ===============> */
  create2faSecret: asyncHandler( async (req, res) => {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(400).json({msg: 'No user found!'});
    
    if(user?.secret) return res.status(400).json({msg: 'Two Factor Authentication already enabled'}); // If 2FA is already enabled, return error message
  
    const userEmail = user.email; // Get user email
    const secret = generateSecret(); // Generate Base32 Secret
    const qrCode = await generateQRCode(userEmail, secret); // Generate QR Code
    
    await Users.findByIdAndUpdate(req.user.id, {secret}) // Update User with Secret and 2FA status
  
    res.status(200).json({msg: 'Two Factor Authentication created', secret, qrCode});
  }),
  /* <=============== Remove Two Factor Auth Secret ===============> */
  remove2faSecret: asyncHandler( async (req, res) => {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(400).json({msg: 'No user found!'});

    if(!user?.secret) return res.status(400).json({msg: 'Two Factor Authentication already disabled'}); // If 2FA is already disabled, return error message
    await Users.findByIdAndUpdate(req.user.id, {secret: ''}) // Update User with Secret and 2FA status with an empty string

    res.status(200).json({msg: 'Two Factor Authentication disabled'});
  }),
};

module.exports = users;