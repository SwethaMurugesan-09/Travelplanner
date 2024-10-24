const mongoose = require('mongoose');

const specificPlaceSchema = mongoose.Schema(
  {
    placeName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
    hotels: [
      {
        name: { type: String, required: true }, // Hotel name
        imageUrl: { type: String, required: true }, // Hotel image
        ratings: { type: Number, required: true }, // Hotel ratings
      },
    ],
    tripplaces: [
      {
        name: { type: String, required: true }, // Trip place name
        imageUrl: { type: String, required: true }, // Trip place image
        details: { type: String, required: true }, // Trip place details
      },
    ],
    restaurant: [
      {
        name: { type: String, required: true }, // Restaurant name
        imageUrl: { type: String, required: true }, // Restaurant image
        ratings: { type: Number, required: true }, // Restaurant ratings
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SpecificPlace = mongoose.model('SpecificPlace', specificPlaceSchema);

module.exports = SpecificPlace;
