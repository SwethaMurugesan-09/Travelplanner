const { Hotel, Restaurant, TripPlace } = require('../models/Details');
const SpecificPlace = require('../models/SpecificPlace');
const Place = require('../models/Place');

// Hotel Controller
const hotelController = {
  // Create a new hotel
  createHotel: async (req, res) => {
    try {
      const { hotels } = req.body; // Array of hotel details
      const hotel = new Hotel(hotels);
      const savedHotel = await hotel.save();
      res.status(201).json(savedHotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Fetch all hotels
  getHotels: async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Fetch a hotel by ID from SpecificPlace
  getHotelById: async (req, res) => {
    try {
      const specificPlace = await SpecificPlace.findOne({ 'hotels._id': req.params.id });

      if (!specificPlace) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      const hotel = specificPlace.hotels.find(h => h._id.toString() === req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a hotel by ID
  updateHotel: async (req, res) => {
    try {
      const { name, imageUrl, ratings } = req.body;
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { name, imageUrl, ratings },
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

// Restaurant Controller
const restaurantController = {
  // Create a new restaurant
  createRestaurant: async (req, res) => {
    try {
      const { restaurant } = req.body; // Array of restaurant details
      const newRestaurant = new Restaurant(restaurant);
      const savedRestaurant = await newRestaurant.save();
      res.status(201).json(savedRestaurant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Fetch all restaurants
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Fetch a restaurant by ID from SpecificPlace
  getRestaurantById: async (req, res) => {
    try {
      const specificPlace = await SpecificPlace.findOne({ 'restaurant._id': req.params.id });

      if (!specificPlace) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      const restaurant = specificPlace.restaurant.find(r => r._id.toString() === req.params.id);
      res.status(200).json(restaurant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a restaurant by ID
  updateRestaurant: async (req, res) => {
    try {
      const { name, imageUrl, ratings } = req.body;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { name, imageUrl, ratings },
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

// TripPlace Controller
const tripPlaceController = {
  // Create a new trip place
  createTripPlace: async (req, res) => {
    try {
      const { tripplaces } = req.body; // Array of trip place details
      const tripPlace = new TripPlace(tripplaces);
      const savedTripPlace = await tripPlace.save();
      res.status(201).json(savedTripPlace);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Fetch all trip places
  getTripPlaces: async (req, res) => {
    try {
      const tripPlaces = await TripPlace.find();
      res.status(200).json(tripPlaces);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Fetch a trip place by ID from SpecificPlace
  getTripPlaceById: async (req, res) => {
    try {
      const specificPlace = await SpecificPlace.findOne({ 'tripplaces._id': req.params.id });

      if (!specificPlace) {
        return res.status(404).json({ message: 'Trip Place not found' });
      }

      const tripPlace = specificPlace.tripplaces.find(tp => tp._id.toString() === req.params.id);
      res.status(200).json(tripPlace);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update a trip place by ID
  updateTripPlace: async (req, res) => {
    try {
      const { name, imageUrl, details } = req.body;
      const updatedTripPlace = await TripPlace.findByIdAndUpdate(
        req.params.id,
        { name, imageUrl, details },
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
