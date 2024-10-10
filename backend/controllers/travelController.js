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
  const { country, state, city, startTravelDate, endTravelDate, notes } = req.body;

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

    const savedTravelPlan = await newTravelPlan.save(); 
    res.status(201).json(savedTravelPlan);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

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

module.exports = {
  getAllTravelPlans,
  getTravelPlanById,
  createTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
};
