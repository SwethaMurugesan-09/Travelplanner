const SpecificPlace = require('../models/SpecificPlace'); 
const Place = require('../models/Place');

const createSpecificPlace = async (req, res) => {
  const { placeName, hotels, tripplaces, restaurant } = req.body;

  console.log(req.body); // Debugging: log the incoming request data

  // Check if all required fields are provided
  if (!placeName || !hotels || !tripplaces || !restaurant) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const place = await Place.findOne({ placeName });

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const newSpecificPlace = new SpecificPlace({
      placeName: place._id, 
      hotels,               
      tripplaces,           
      restaurant,        
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
    // Find the Place document by its name
    const place = await Place.findOne({ placeName });

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Get SpecificPlaces linked to the Place by its _id
    const specificPlaces = await SpecificPlace.find({ placeName: place._id }).populate('placeName');

    if (specificPlaces.length === 0) {
      return res.status(404).json({ message: 'No specific places found for this place' });
    }

    res.status(200).json(specificPlaces[0]); // Return the first matching specific place
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

  



// Fetch a specific hotel by ID
const getHotelById = async (req, res) => {
  const { id } = req.params; // Hotel ID from the request parameters

  try {
    const specificPlace = await SpecificPlace.findOne({ 'hotels._id': id }, { 'hotels.$': 1 }); // Find the specific hotel by its ID
    if (!specificPlace || !specificPlace.hotels) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(specificPlace.hotels[0]); // Return the specific hotel
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch a specific restaurant by ID
const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const specificPlace = await SpecificPlace.findOne({ 'restaurant._id': id }, { 'restaurant.$': 1 });
    if (!specificPlace || !specificPlace.restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(specificPlace.restaurant[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch a specific trip place by ID
const getTripPlaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const specificPlace = await SpecificPlace.findOne({ 'tripplaces._id': id }, { 'tripplaces.$': 1 });
    if (!specificPlace || !specificPlace.tripplaces) {
      return res.status(404).json({ message: 'Trip place not found' });
    }
    res.status(200).json(specificPlace.tripplaces[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getHotelById,
  getRestaurantById,
  getTripPlaceById,
  createSpecificPlace,
  getSpecificPlaceByPlaceName,
};
