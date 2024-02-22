/** 
 * Refresh Access Token Endpoint Route
*/

const express = require('express');
const router = express.Router();
// Import Auth Controller
const auth = require('../controllers/Auth');

// Routes
router.post('/auth/refresh', auth.refreshToken);

// Export Router Object
module.exports = router;