/**
 * @description Router: Auth
 * @requires express
 * @requires AuthController
 * @api {post} /auth/refresh Refresh Token
 */

const express = require('express');
const router = express.Router();
// Import Auth Controller
const auth = require('../controllers/Auth');

// Routes
router.post('/auth/refresh', auth.refreshToken);

// Export Router Object
module.exports = router;