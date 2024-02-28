/**
 * @description: This file is used to verify the access token of the user.
 * @requires dotenv
 * @requires jsonwebtoken
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  // Get Token from Authorization Header
  const token = req?.headers?.authorization?.split(' ')[1];

  // Check if Token Exists
  if (!token) return res.status(401).send('Access Denied');

  // Verify Token
  jwt.verify(token, process.env.ACCESS_SECRET, (err, payload) => {
    if (err) return res.status(401).send('Invalid Access Token');
    req.user = payload;
    next();
  });
};

module.exports = { verify };