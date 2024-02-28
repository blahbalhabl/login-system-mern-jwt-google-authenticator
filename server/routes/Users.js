/**
 * @apiGroup Users
 * @description - User Related Routes
 * @requires express
 * @requires UsersModel
 * @requires VerifyMiddleware
 * @api {post} /auth/register Register User
 * @api {post} /auth/login Login User
 * @api {get} /users Get All Users
 * @api {get} /auth/logout Logout User
 */

const express = require('express');
const router = express.Router();
const { verify } = require('../middlewares/verify');
// Import Controllers
const users = require('../controllers/Users');

// Public Routes
router.post('/auth/register', users.register);
router.post('/auth/login', users.login);

// Use Verify Token Middleware
router.use(verify);

// Private Routes
router.get('/users', users.getAllUsers);
router.get('/auth/logout', users.logout);

// Export Router Object
module.exports = router;