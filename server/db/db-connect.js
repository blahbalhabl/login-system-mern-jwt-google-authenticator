/**
 * @description Database connection
 * @requires mongoose
 */

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Export the mongoose object
module.exports = mongoose;