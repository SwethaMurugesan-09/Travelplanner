const express = require('express');
const specificRoutes = express.Router();
const { createSpecificPlace, getSpecificPlaceByPlaceName } = require('../controllers/specificController'); // Check this path

specificRoutes.post('/specificplaces', createSpecificPlace); 
specificRoutes.get('/explore/:placeName', getSpecificPlaceByPlaceName); // This matches /explore/:placeName in Explore.jsx

module.exports = specificRoutes;
