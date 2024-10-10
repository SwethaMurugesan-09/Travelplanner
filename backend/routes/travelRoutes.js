const express = require('express');
const travelRouter = express.Router();
const travelController = require('../controllers/travelController'); 
travelRouter.get('/travel-plans', travelController.getAllTravelPlans);

travelRouter.get('/travel-plans/:id', travelController.getTravelPlanById);

travelRouter.post('/travel-plans', travelController.createTravelPlan);

travelRouter.put('/travel-plans/:id', travelController.updateTravelPlan);

travelRouter.delete('/travel-plans/:id', travelController.deleteTravelPlan);


module.exports = travelRouter;
