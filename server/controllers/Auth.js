/** 
 * Refresh Access Token Endpoint Controller
 * 
 **/

require('dotenv').config();
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncMiddleware');

const auth = {
  refreshToken: asyncHandler( async (req, res) => {
    const token = req.cookies._refresh;
    if (!token) return res.status(401).json({msg: 'No token found!'});

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({msg: 'Invalid token!'});

      const accessToken = jwt.sign(
        {
          id: user.id, 
          username: user.username
        }, 
        process.env.ACCESS_SECRET, 
        {expiresIn: `${process.env.ACCESS_EXPIRES}s`}
      );
      res.status(200).json({accessToken});
    });
  }),
};

module.exports = auth;