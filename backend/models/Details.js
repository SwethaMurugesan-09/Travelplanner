const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
  hotels: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to SpecificPlace
    ref: 'SpecificPlace',
  },
  name: { type: String, required: true },        // Hotel name
  details: { type: String, required: true },     // Hotel details
  images: [{ type: String, required: true }],    // Array of hotel images
  ratings: { type: Number, required: true },     // Hotel ratings
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

const restaurantSchema = mongoose.Schema({
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,  // Reference to SpecificPlace
    ref: 'SpecificPlace',
  },
  name: { type: String, required: true },        // Restaurant name
  details: { type: String, required: true },     // Restaurant details
  images: [{ type: String, required: true }],    // Array of restaurant images
  ratings: { type: Number, required: true },     // Restaurant ratings
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const tripPlaceSchema = mongoose.Schema({
  name: { type: String, required: true },    
  tripplaces:   {
    type: mongoose.Schema.Types.ObjectId,  // Reference to SpecificPlace
    ref: 'SpecificPlace',
  },
  details: { type: String, required: true },     // Trip place details
  images: [{ type: String, required: true }],    // Array of trip place images
}, { timestamps: true });

const TripPlace = mongoose.model('TripPlace', tripPlaceSchema);

module.exports = { Hotel, Restaurant, TripPlace };
