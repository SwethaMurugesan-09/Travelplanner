const express = require('express');
const placesRoutes = express.Router();
const { createSpecificPlace, getSpecificPlaceByPlaceName } = require('../controllers/placesController'); // Ensure this path is correct

placesRoutes.post('/places', createSpecificPlace);
placesRoutes.get('/places/:cityName', getSpecificPlaceByPlaceName);

module.exports = placesRoutes;
