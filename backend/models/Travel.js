const mongoose = require('mongoose');

const travelSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    touristPlace: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
