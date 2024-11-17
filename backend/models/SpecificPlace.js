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
        name: { type: String, required: true },
        imageUrl: [{ type: String, required: true }],
        ratings: { type: Number, required: true },
        details: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    tripplaces: [
      {
        name: { type: String, required: true },
        imageUrl: [{ type: String, required: true }],
        details: { type: String, required: true },
      },
    ],
    restaurant: [
      {
        name: { type: String, required: true },
        imageUrl: [{ type: String, required: true }],
        ratings: { type: Number, required: true },
        details: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SpecificPlace = mongoose.model('SpecificPlace', specificPlaceSchema);

module.exports = SpecificPlace;
