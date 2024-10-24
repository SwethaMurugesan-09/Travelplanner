const express = require('express');
const { hotelController, restaurantController, tripPlaceController } = require('../controllers/detailsController');
const router = express.Router();

// Hotel routes
router.post('/hotels', hotelController.createHotel);
router.get('/hotels', hotelController.getHotels);
router.get('/hotels/:id', hotelController.getHotelById);
router.put('/hotels/:id', hotelController.updateHotel);
router.delete('/hotels/:id', hotelController.deleteHotel);

// Restaurant routes
router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// TripPlace routes
router.post('/tripplaces', tripPlaceController.createTripPlace);
router.get('/tripplaces', tripPlaceController.getTripPlaces);
router.get('/tripplaces/:id', tripPlaceController.getTripPlaceById);
router.put('/tripplaces/:id', tripPlaceController.updateTripPlace);
router.delete('/tripplaces/:id', tripPlaceController.deleteTripPlace);

module.exports = router;
