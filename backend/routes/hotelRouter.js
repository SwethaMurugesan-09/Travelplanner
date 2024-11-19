const express = require('express');
const HotelBookingController = require('../controllers/hotelBookingController');

const hotelrouter = express.Router();

// Route to create a new booking
hotelrouter.post('/book-hotel', HotelBookingController.createBooking);

// Route to get all bookings by email
hotelrouter.get('/bookings', HotelBookingController.getBookingsByEmail);

// Route to update the status of a booking
hotelrouter.put('/book-hotel/:id/status', HotelBookingController.updateBookingStatus);

// Route to delete an entire booking
hotelrouter.delete('/bookings/:id', HotelBookingController.totalCancellation);

// Route to delete a specific person from the booking
hotelrouter.delete('/bookings/:bookingId/person/:personIndex', HotelBookingController.deleteBooking);

module.exports = hotelrouter;
