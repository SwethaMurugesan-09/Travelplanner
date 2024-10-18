const Place = require('../models/Place'); 
const Travel = require('../models/Travel'); 

const createPlace = async (req, res) => {
  const { placeName, cityName, imageUrl } = req.body; 

  if (!placeName || !cityName || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const cityExists = await Travel.findOne({ city: cityName });
    
    if (!cityExists) {
      return res.status(404).json({ message: 'City not found' });
    }

    const newPlace = new Place({
      placeName,
      city: cityExists._id, 
      imageUrl,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



const getTouristPlacesByCity = async (req, res) => {
  const { cityName } = req.params; // Change to cityName

  try {
    // Find the city by its name
    const city = await Travel.findOne({ city: cityName });
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Fetch places by the city ID
    const places = await Place.find({ city: city._id }).populate('city');
    
    if (places.length === 0) {
      return res.status(404).json({ message: 'No tourist places found for this city' });
    }

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
    createPlace,
    getTouristPlacesByCity,
};