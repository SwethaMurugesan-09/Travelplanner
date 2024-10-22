const mongoose = require('mongoose');

const placeSchema = mongoose.Schema(
  {
    placeName: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Travel', 
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    ratings:{
      type:Number,
      required:true,
    },
    details:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
