const Travel = require( "../models/travel");
const getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await Travel.find(); 
    res.status(200).json(travelPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

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

const createTravelPlan = async (req, res) => {
  const { country, state, city, touristPlace} = req.body; 
  if (!country || !state || !city || !touristPlace) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const newTravelPlan = new Travel({
      country,
      state,
      city,
      touristPlace,
    });

    const savedTravelPlan = await newTravelPlan.save(); 
    res.status(201).json(savedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


const updateTravelPlan = async (req, res) => {
  const { country, state, city, touristPlace} = req.body;

  try {
    const updatedTravelPlan = await Travel.findByIdAndUpdate(
      req.params.id,
      {
        country,
        state,
        city,
        touristPlace,
      },
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

const getAllCountries = async (req, res) => {
  try {
    const countries = await Travel.distinct('country');
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

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
    const cities = await Travel.distinct('city', { state: req.query.state });
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
  getTouristPlacesByCity ,
};
