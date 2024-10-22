const Place = require('../models/Place'); 
const Travel = require('../models/Travel'); 


const createPlace = async (req, res) => {
  const { placeName, city, imageUrl } = req.body;

  // Check if all fields are present
  if (!placeName || !city || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create new place
    const newPlace = new Place({
      placeName,
      city,
      imageUrl,
    });

    // Save to database
    await newPlace.save();

    // Send success response
    res.status(201).json(newPlace);
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ message: 'Server error' });
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