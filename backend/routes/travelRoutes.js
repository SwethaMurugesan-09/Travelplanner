// travelRoutes.js
const express = require('express');
const travelRouter = express.Router();
const travelController = require('../controllers/travelController'); // Corrected path

// Route to get all travel plans
travelRouter.get('/travel-plans', travelController.getAllTravelPlans);

// Route to get a single travel plan by ID
travelRouter.get('/travel-plans/:id', travelController.getTravelPlanById);

// Route to create a new travel plan
travelRouter.post('/travel-plans', travelController.createTravelPlan);

// Route to update a travel plan by ID
travelRouter.put('/travel-plans/:id', travelController.updateTravelPlan);

// Route to delete a travel plan by ID
travelRouter.delete('/travel-plans/:id', travelController.deleteTravelPlan);


module.exports = travelRouter;
