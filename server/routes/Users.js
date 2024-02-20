/*
  * User Routes
  * Import all functions from the Users Controller
  * Export the routes to be used in server.js
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
// router.post('/register', users.register);

// Export Router Object
module.exports = router;