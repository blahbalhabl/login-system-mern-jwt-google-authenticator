/**
 * Async Handler
 * @param {*} callback 
 * @returns 
 */

const asyncHandler = ( callback ) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      return res.status(500).json({err, msg: 'Server Error'});
    }
  };
};

module.exports = asyncHandler;