const express = require('express');
const { createAdmin, getAdmin, getSingleAdmin, updateAdmin, deleteAdmin, adminLogging } = require('../Controllers/admin.controller');
const route = express.Router();

route.post('/', createAdmin);
route.get('/', getAdmin);
route.get('/:id', getSingleAdmin);
route.put('/:id', updateAdmin);
route.delete('/:id', deleteAdmin);
route.post('/login', adminLogging)

module.exports = route;