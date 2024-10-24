const express = require('express');
const specificRoutes = express.Router();
const { createSpecificPlace, getSpecificPlaceByPlaceName ,getHotelById, getRestaurantById, getTripPlaceById} = require('../controllers/specificController'); // Check this path

specificRoutes.post('/specificplaces', createSpecificPlace); 
specificRoutes.get('/explore/:placeName', getSpecificPlaceByPlaceName); // This matches /explore/:placeName in Explore.jsx
specificRoutes.get('/hotels/:id', getHotelById);

specificRoutes.get('/restaurants/:id', getRestaurantById);
specificRoutes.get('/tripplaces/:id', getTripPlaceById);

module.exports = specificRoutes;
