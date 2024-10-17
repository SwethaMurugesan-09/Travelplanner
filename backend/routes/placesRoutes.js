const express = require('express');
const placesRoutes = express.Router();
const { createPlace, getTouristPlacesByCity } = require('../controllers/placesController');

placesRoutes.post('/places', createPlace);

placesRoutes.get('/places/:cityName', getTouristPlacesByCity);

module.exports = placesRoutes;
