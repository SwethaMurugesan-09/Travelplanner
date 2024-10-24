    const express = require('express');
    const { hotelController, restaurantController, tripPlaceController } = require('../controllers/detailsController');
    const detailsRoutes = express.Router();

    // Hotel routes
    detailsRoutes .post('/hotels', hotelController.createHotel);
    detailsRoutes .get('/hotels', hotelController.getHotels);
    detailsRoutes .get('/hotels/:id', hotelController.getHotelById);
    detailsRoutes .put('/hotels/:id', hotelController.updateHotel);
    detailsRoutes .delete('/hotels/:id', hotelController.deleteHotel);

    // Restaurant routes
    detailsRoutes.post('/restaurants', restaurantController.createRestaurant);
    detailsRoutes.get('/restaurants', restaurantController.getRestaurants);
    detailsRoutes.get('/restaurants/:id', restaurantController.getRestaurantById);
    detailsRoutes.put('/restaurants/:id', restaurantController.updateRestaurant);
    detailsRoutes.delete('/restaurants/:id', restaurantController.deleteRestaurant);

    // TripPlace routes
    detailsRoutes.post('/tripplaces', tripPlaceController.createTripPlace);
    detailsRoutes.get('/tripplaces', tripPlaceController.getTripPlaces);
    detailsRoutes.get('/tripplaces/:id', tripPlaceController.getTripPlaceById);
    detailsRoutes.put('/tripplaces/:id', tripPlaceController.updateTripPlace);
    detailsRoutes.delete('/tripplaces/:id', tripPlaceController.deleteTripPlace);

    module.exports = detailsRoutes;
