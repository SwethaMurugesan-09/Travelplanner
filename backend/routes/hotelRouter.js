const express = require('express');
const HotelBookingController = require('../controllers/hotelBookingController');

const hotelrouter = express.Router();

hotelrouter.post('/book-hotel', HotelBookingController.createBooking);

hotelrouter.get('/book-hotel/:id', HotelBookingController.getBookingById);
hotelrouter.get('/bookings', HotelBookingController.getBookingsByEmail);
hotelrouter.put('/book-hotel/:id/status', HotelBookingController.updateBookingStatus);
hotelrouter.post('/book-hotel', HotelBookingController.deleteBooking);

module.exports = hotelrouter;
