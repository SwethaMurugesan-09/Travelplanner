const mongoose = require('mongoose');

// Define the Place schema
const placeSchema = mongoose.Schema(
  {
    placeName: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Travel collection
      ref: 'Travel', // Foreign key to the Travel collection
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
