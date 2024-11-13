const express = require('express');
const HotelBookingController = require('../controllers/hotelBookingController');

const hotelrouter = express.Router();

// Route to create a booking
hotelrouter.post('/book-hotel', HotelBookingController.createBooking);

// Route to get a specific booking by ID
hotelrouter.get('/book-hotel/:id', HotelBookingController.getBookingById);

// Route to update booking status
hotelrouter.put('/book-hotel/:id/status', HotelBookingController.updateBookingStatus);

module.exports = hotelrouter;
