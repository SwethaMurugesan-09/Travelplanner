const express = require('express');
const travelRouter = express.Router();
const travelController = require('../controllers/travelController'); 
travelRouter.get('/travelplans', travelController.getAllTravelPlans);

travelRouter.get('/travelplans/:id', travelController.getTravelPlanById);

travelRouter.post('/travelplans', travelController.createTravelPlan);

travelRouter.put('/travelplans/:id', travelController.updateTravelPlan);

travelRouter.delete('/travelplans/:id', travelController.deleteTravelPlan);
travelRouter.get('/countries', travelController.getAllCountries);
travelRouter.get('/states', travelController.getStatesByCountry);
travelRouter.get('/cities', travelController.getCitiesByState);


module.exports = travelRouter;
