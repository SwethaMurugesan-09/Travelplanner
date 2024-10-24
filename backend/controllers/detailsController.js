const { Hotel, Restaurant, TripPlace } = require('../models/Details'); // Correct import for Details.js

const hotelController = {
  createHotel: async (req, res) => {
    try {
      const { hotels,name, details, images, ratings } = req.body;
      const hotel = new Hotel({ hotels,name, details, images, ratings });
      const savedHotel = await hotel.save();
      res.status(201).json(savedHotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getHotels: async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getHotelById: async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a hotel by ID
  updateHotel: async (req, res) => {
    try {
      const {hotels,name, details, images, ratings } = req.body;
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { name, details, images, ratings,hotels },
        { new: true }
      );
      if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });
      res.status(200).json(updatedHotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a hotel by ID
  deleteHotel: async (req, res) => {
    try {
      const hotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

const restaurantController = {
  // Create a new restaurant
  createRestaurant: async (req, res) => {
    try {
      const { restaurant,name, details, images, ratings } = req.body;
      const restaurants = new Restaurant({restaurant, name, details, images, ratings });
      const savedRestaurant = await restaurants.save();
      res.status(201).json(savedRestaurant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all restaurants
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get a restaurant by ID
  getRestaurantById: async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
      res.status(200).json(restaurant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a restaurant by ID
  updateRestaurant: async (req, res) => {
    try {
      const { name, details, images, ratings } = req.body;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { name, details, images, ratings },
        { new: true }
      );
      if (!updatedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
      res.status(200).json(updatedRestaurant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a restaurant by ID
  deleteRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
      if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

// Controller for TripPlace operations
const tripPlaceController = {
  // Create a new trip place
  createTripPlace: async (req, res) => {
    try {
      const {tripplaces, name, details, images } = req.body;
      const tripPlace = new TripPlace({tripplaces, name, details, images });
      const savedTripPlace = await tripPlace.save();
      res.status(201).json(savedTripPlace);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all trip places
  getTripPlaces: async (req, res) => {
    try {
      const tripPlaces = await TripPlace.find();
      res.status(200).json(tripPlaces);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get a trip place by ID
  getTripPlaceById: async (req, res) => {
    try {
      const tripPlace = await TripPlace.findById(req.params.id);
      if (!tripPlace) return res.status(404).json({ message: 'Trip Place not found' });
      res.status(200).json(tripPlace);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a trip place by ID
  updateTripPlace: async (req, res) => {
    try {
      const { name, details, images } = req.body;
      const updatedTripPlace = await TripPlace.findByIdAndUpdate(
        req.params.id,
        { name, details, images },
        { new: true }
      );
      if (!updatedTripPlace) return res.status(404).json({ message: 'Trip Place not found' });
      res.status(200).json(updatedTripPlace);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a trip place by ID
  deleteTripPlace: async (req, res) => {
    try {
      const tripPlace = await TripPlace.findByIdAndDelete(req.params.id);
      if (!tripPlace) return res.status(404).json({ message: 'Trip Place not found' });
      res.status(200).json({ message: 'Trip Place deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = { hotelController, restaurantController, tripPlaceController };
