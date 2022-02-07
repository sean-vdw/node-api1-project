const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

// ENDPOINTS

// --> Get All Users
server.get('/api/users', (req, res) => {
  Users.find()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err => {
      res.status(500).json({
        message: `Could not fetch users...`,
        error: err.message,
      })
    })
});

// --> Get User with Specific ID
// --> Post New User
// --> Put/ Update User with Specified ID
// --> Delete User

module.exports = server; 
