const express = require('express');
const travelRouter = express.Router();
const travelController = require('../controllers/travelController'); 
travelRouter.get('/travelplans', travelController.getAllTravelPlans);

travelRouter.get('/travelplans/:id', travelController.getTravelPlanById);

travelRouter.post('/travelplans', travelController.createTravelPlan);

travelRouter.put('/travelplans/:id', travelController.updateTravelPlan);

travelRouter.delete('/travelplans/:id', travelController.deleteTravelPlan);

travelRouter.get('/states', travelController.getAllState);
travelRouter.get('/cities', travelController.getCitiesByState);
travelRouter.get('/randomstates', travelController.getRandomStatesWithImages);


module.exports = travelRouter;
