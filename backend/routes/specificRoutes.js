const express = require('express');
const specificRoutes = express.Router();
const { createSpecificPlace, getSpecificPlaceByPlaceName } = require('../controllers/specificController'); // Check this path

specificRoutes.post('/specificplaces', createSpecificPlace); 
specificRoutes.post('/explore/:placeName', getSpecificPlaceByPlaceName);

module.exports = specificRoutes;
