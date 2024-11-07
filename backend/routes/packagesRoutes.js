const express = require('express');
const packagesrouter = express.Router();
const packagesController = require('../controllers/packagesController'); // Adjust path as necessary

packagesrouter.post('/create', packagesController.createPackage);
packagesrouter.get('/get', packagesController.getPackages);
packagesrouter.get('/get/:id', packagesController.getPackageById);

module.exports = packagesrouter;
g