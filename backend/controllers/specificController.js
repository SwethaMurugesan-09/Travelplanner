const SpecificPlace = require('../models/SpecificPlace'); // Make sure this path is correct
const Place=require('../models/Place');
const createSpecificPlace = async (req, res) => {
  const { placeName, hotels, tripplaces, restaurant, imageUrl } = req.body;

  if (!placeName || !hotels || !tripplaces || !restaurant || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Assuming you have a method to find a Place by its name
    const place = await Place.findOne({ placeName }); // Adjust based on your Place schema

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const newSpecificPlace = new SpecificPlace({
      placeName: place._id,  // This references the Place document
      hotels,
      tripplaces,
      restaurant,
      imageUrl,
    });

    const savedSpecificPlace = await newSpecificPlace.save();
    res.status(201).json(savedSpecificPlace);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getSpecificPlaceByPlaceName = async (req, res) => {
    const { placeName } = req.params;
  
    try {
      const place = await Place.findOne({ placeName });
  
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
  
      // Get specific places linked to the place by its _id
      const specificPlaces = await SpecificPlace.find({ placeName: place._id }).populate('placeName'); 
  
      if (specificPlaces.length === 0) {
        return res.status(404).json({ message: 'No specific places found for this place' });
      }
  
      res.status(200).json(specificPlaces[0]); // Return the first matching specific place
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
module.exports = {
  createSpecificPlace,
  getSpecificPlaceByPlaceName,
};
