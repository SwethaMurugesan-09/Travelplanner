const Travel = require( "../models/travel");
// Get all travel plans
const getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await Travel.find(); // Fetch all travel plans from the database
    res.status(200).json(travelPlans);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single travel plan by ID
const getTravelPlanById = async (req, res) => {
  try {
    const travelPlan = await Travel.findById(req.params.id); // Fetch travel plan by ID
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
  const { country, state, city, startTravelDate, endTravelDate, notes } = req.body;

  // Basic validation for required fields
  if (!country || !state || !city || !startTravelDate || !endTravelDate) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const newTravelPlan = new Travel({
      country,
      state,
      city,
      startTravelDate,
      endTravelDate,
      notes,
    });

    const savedTravelPlan = await newTravelPlan.save(); // Save the new travel plan to the database
    res.status(201).json(savedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing travel plan by ID
const updateTravelPlan = async (req, res) => {
  const { country, state, city, startTravelDate, endTravelDate, notes } = req.body;

  try {
    const updatedTravelPlan = await Travel.findByIdAndUpdate(
      req.params.id,
      {
        country,
        state,
        city,
        startTravelDate,
        endTravelDate,
        notes,
      },
      { new: true, runValidators: true } // Return the updated document and validate the data
    );

    if (!updatedTravelPlan) {
      return res.status(404).json({ message: 'Travel plan not found' });
    }

    res.status(200).json(updatedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a travel plan by ID
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

module.exports = {
  getAllTravelPlans,
  getTravelPlanById,
  createTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
};
