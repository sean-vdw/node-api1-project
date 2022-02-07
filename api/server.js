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
server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    res.json(user);
  } catch(err) {
      res.status(500).json({
        message: `Could not get user with id ${id}...`,
        error: err.message,
      })
    }
});

// --> Post New User
server.post('/api/users', async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: 'Name and Bio are both required...'
      })
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch(err) {
    res.status(500).json({
      message: `Could not insert new user...`,
      error: err.message,
    })
  }
});

// --> Put/ Update User with Specified ID
// --> Delete User

module.exports = server; 
