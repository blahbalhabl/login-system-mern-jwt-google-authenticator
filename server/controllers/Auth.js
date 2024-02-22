/** 
 * Refresh Access Token Endpoint Controller
 * 
 **/

require('dotenv').config();
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncMiddleware');
const User = require('../models/Users');

const auth = {
  refreshToken: asyncHandler( async (req, res) => {
    const token = req.cookies._refresh;
    if (!token) return res.status(401).json({msg: 'No Refresh Token Found!'});

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({msg: 'Invalid Refresh token!'});

      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(400).json({msg: 'No user found!'});

      const accessToken = jwt.sign(
        {
          id: decoded.id, 
          username: decoded.username
        }, 
        process.env.ACCESS_SECRET, 
        {expiresIn: `${process.env.ACCESS_EXPIRES}s`}
      );
      res.status(200).json({user, token: accessToken});
    });
  }),
};

module.exports = auth;