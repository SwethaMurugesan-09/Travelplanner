const mongoose = require('mongoose');

const specificplaceSchema = mongoose.Schema(
  {
    placeName: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Place', 
      required: true,
    },
    hotels: {
      type: String,
      required: true,
    },
    tripplaces: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
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

const SpecificPlace = mongoose.model('SpecificPlace', specificplaceSchema);

module.exports = SpecificPlace;
