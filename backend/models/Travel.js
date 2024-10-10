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
    startTravelDate: {
      type: Date,
      required: true,
    },
    endTravelDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
