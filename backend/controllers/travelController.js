const Travel = require("../models/Travel");

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
  const { state, city, imageUrl ,notes} = req.body;

  if (!notes || !state || !city || !imageUrl) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const newTravelPlan = new Travel({
      state,
      city,
      imageUrl,
      notes,
    });

    const savedTravelPlan = await newTravelPlan.save();
    res.status(201).json(savedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing travel plan
const updateTravelPlan = async (req, res) => {
  const { state, city, imageUrl,notes } = req.body;

  try {
    const updatedTravelPlan = await Travel.findByIdAndUpdate(
      req.params.id,
      {  state, city, imageUrl ,notes},
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

const getAllState = async (req, res) => {
  try {
    const states = await Travel.distinct('state');
    res.status(200).json(states);  
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getCitiesByState = async (req, res) => {
  try {
    const cities = await Travel.find({ state: req.query.state }).select('city imageUrl notes');
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


const getRandomStatesWithImages = async (req, res) => {
  try {
    // Fetch all distinct states with their images
    const states = await Travel.aggregate([
      { $group: { _id: "$state", imageUrl: { $first: "$imageUrl" } } }
    ]);

    if (states.length < 10) {
      return res.status(200).json(states); // If less than 10 states, return all
    }

    const randomStates = [states[0], states[1]]; // Make sure there are at least 10 states
    res.status(200).json(randomStates);
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
  getAllState,
  getCitiesByState,
  getRandomStatesWithImages,
};
