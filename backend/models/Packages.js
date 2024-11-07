const mongoose = require('mongoose');

const packagesSchema = mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
          },
          imageUrl: [{ 
            type: String, required: true 
        }], 
          description:{
            type: String,
            required: true,
          },
          rate:{
            type: Number,
            required: true,
          }
    },
    {
        timestamps: true,
    }
);
const Packages = mongoose.model('Packages', packagesSchema);

module.exports = Packages;
