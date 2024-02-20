/*
  * This file contains the controller for the Users model.
*/

const users = {
  // Get All Users
  getAllUsers: async (req, res) => {
    try {
      res.status(200).json({msg: 'Get All Users'});
    } catch (err) {
      res.status(500).send('Server Error');
    };
  },
  // Register User
  register: async (req, res) => {
    try {
      res.status(200).json({msg: 'Register User'});
    } catch (err) {
      res.status(500).send('Server Error');
    };
  },
  login: async (req, res) => {
    try {
      res.status(200).json({msg: 'Login User'});
    } catch (err) {
      res.status(500).send('Server Error');
    };
  },
};

module.exports = users;