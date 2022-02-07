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
        message: `The users information could not be retrieved`,
        error: err.message,
      })
    })
});

// --> Get User with Specific ID
server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  try {
    if (user === undefined || user === null) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else {
      res.json(user);
    }
  } catch(err) {
      res.status(500).json({
        message: `The user information could not be retrieved`,
        error: err.message,
      })
    }
});

// --> Post New User
server.post('/api/users', async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: 'Please provide name and bio for the user'
      })
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch(err) {
    res.status(500).json({
      message: `There was an error while saving the user to the database`,
      error: err.message,
    })
  }
});

// --> Put/ Update User with Specified ID
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedUser = await Users.update(id, body);
  try {
    if (updatedUser === null || updatedUser === undefined) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else if (!body.name || !body.bio) {
      res.status(400).json({
        message: 'Please provide name and bio for the user'
      })
    } else {
      res.status(200).json(updatedUser);
    }
  } catch(err) {
    res.status(500).json({
      message: 'The user information could not be modified'
    })
  }
});

// --> Delete User
server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await Users.remove(id);
  try {
    if (deletedUser === null || deletedUser === undefined) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else {
      res.json(deletedUser)
    }
  } catch(err) {
    res.status(500).json({
      message: 'The user could not be removed'
    })
  }
});

module.exports = server; 
