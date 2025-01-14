const mongoose = require('mongoose');

const travelSchema = mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    imageUrl: { 
      type: String,
      required: true,
    },
    notes:{
      type:String,
      required:true,
    },
    ratings:{
      type:Number,
      required:true,
    }
  },
  {
    timestamps: true, 
  }
);

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
