const mongoose = require('mongoose');
const HotelBooking = require('../models/HotelBooking');
const SpecificPlace = require('../models/SpecificPlace');
const Users = require('../models/Users');


const HotelBookingController = {
  async createBooking(req, res) {
      try {
          // Log the entire request body for debugging
          console.log("Received Request Body:", req.body);
  
          // Extract fields from request body
          const { email, hotelId, bookingDate, numberOfPersons, numberOfDays, personsDetails } = req.body;
  
          // Check for required fields
          if (!email || !hotelId || !bookingDate || !numberOfPersons || !numberOfDays) {
              return res.status(400).json({ message: 'Missing required fields' });
          }
  
          // Proceed with creating the booking
          const hotelIdObject = new mongoose.Types.ObjectId(hotelId);
  
          const newBooking = new HotelBooking({
              email,
              hotelId: hotelIdObject,
              bookingDate,
              numberOfPersons,
              numberOfDays,
              personsDetails,
              // foodPreference,
              // acPreference
          });
  
          // Save the booking to the database
          await newBooking.save();
          res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
      } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ message: 'Server error', error: error.message });
      }
  },

  async getBookingById(req, res) {
    try {
      const bookingId = req.params.id;
      const booking = await HotelBooking.findById(bookingId).populate('hotelId');

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      return res.status(200).json({ booking });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async getBookingsByUser(req, res) {
    try {
      const email = req.user.email;

      const bookings = await HotelBooking.find({ email }).populate('hotelId');

      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found' });
      }

      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async updateBookingStatus(req, res) {
    try {
      const bookingId = req.params.id;
      const { status } = req.body;

      if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid booking status' });
      }

      const updatedBooking = await HotelBooking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      return res.status(200).json({ message: 'Booking status updated', booking: updatedBooking });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async deleteBooking(req, res) {
    try {
      const bookingId = req.params.id;

      const deletedBooking = await HotelBooking.findByIdAndDelete(bookingId);

      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = HotelBookingController;
