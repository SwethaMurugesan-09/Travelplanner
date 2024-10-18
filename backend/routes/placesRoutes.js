const express = require('express');
const placesRoutes = express.Router();
const { createPlace, getTouristPlacesByCity } = require('../controllers/placesController'); // Ensure this path is correct

placesRoutes.post('/places', createPlace);
placesRoutes.get('/places/:cityName', getTouristPlacesByCity);

module.exports = placesRoutes;
