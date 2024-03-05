/**
 * @description Service for creating access and refresh tokens
 * @requires dotenv
 * @requires jsonwebtoken
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
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
      role: user.role,
    },
    process.env.REFRESH_SECRET,
    {expiresIn: `${process.env.REFRESH_EXPIRES}s`}
  );
};

module.exports = { createAccessToken, createRefreshToken };