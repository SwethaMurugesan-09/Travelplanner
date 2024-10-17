const Travel = require("../models/Travel");

// Fetch all travel plans
const getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await Travel.find();
    res.status(200).json(travelPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Fetch travel plan by ID
const getTravelPlanById = async (req, res) => {
  try {
    const travelPlan = await Travel.findById(req.params.id);
    if (!travelPlan) {
      return res.status(404).json({ message: 'Travel plan not found' });
    }
    res.status(200).json(travelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new travel plan
const createTravelPlan = async (req, res) => {
  const { country, state, city, imageUrl } = req.body;

  if (!country || !state || !city || !imageUrl) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const newTravelPlan = new Travel({
      country,
      state,
      city,
      imageUrl,
    });

    const savedTravelPlan = await newTravelPlan.save();
    res.status(201).json(savedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing travel plan
const updateTravelPlan = async (req, res) => {
  const { country, state, city, imageUrl } = req.body;

  try {
    const updatedTravelPlan = await Travel.findByIdAndUpdate(
      req.params.id,
      { country, state, city, imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedTravelPlan) {
      return res.status(404).json({ message: 'Travel plan not found' });
    }

    res.status(200).json(updatedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a travel plan
const deleteTravelPlan = async (req, res) => {
  try {
    const deletedTravelPlan = await Travel.findByIdAndDelete(req.params.id);

    if (!deletedTravelPlan) {
      return res.status(404).json({ message: 'Travel plan not found' });
    }

    res.status(200).json({ message: 'Travel plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Fetch all unique countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Travel.distinct('country');
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Fetch all unique states by country
const getStatesByCountry = async (req, res) => {
  try {
    const states = await Travel.distinct('state', { country: req.query.country });
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getCitiesByState = async (req, res) => {
  try {
    const cities = await Travel.find({ state: req.query.state }).select('city imageUrl');
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


const getTouristPlacesByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }

    const touristPlaces = await Travel.find({ city });

    if (touristPlaces.length === 0) {
      return res.status(404).json({ message: 'No tourist places found for this city' });
    }

    res.status(200).json(touristPlaces);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  getAllTravelPlans,
  getTravelPlanById,
  createTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
  getAllCountries,
  getStatesByCountry,
  getCitiesByState,
  getTouristPlacesByCity,
};
