const express = require('express');
const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, loginUser } = require('../Controllers/users.controller');
const route = express.Router();


route.post('/', createUser);
route.post('/login', loginUser)
route.get('/', getAllUsers);
route.get('/:id', getSingleUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;