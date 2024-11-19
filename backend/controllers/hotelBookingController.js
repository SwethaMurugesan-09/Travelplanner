const mongoose = require('mongoose');
const HotelBooking = require('../models/HotelBooking');

const HotelBookingController = {
  async createBooking(req, res) {
    try {
      console.log("Received Request Body:", req.body);

      const { email, hotelId, bookingDate, numberOfPersons, numberOfDays, personsDetails } = req.body;

      if (!email || !hotelId || !bookingDate || !numberOfPersons || !numberOfDays) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const hotelIdObject = new mongoose.Types.ObjectId(hotelId);

      const newBooking = new HotelBooking({
        email,
        hotelId: hotelIdObject,
        bookingDate,
        numberOfPersons,
        numberOfDays,
        personsDetails, // No conversion needed for string schema
      });

      // Save to database
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
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async getBookingsByEmail(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const bookings = await HotelBooking.find({ email }).populate('hotelId');

      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found' });
      }

      return res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
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
      res.status(500).json({ message: 'Server error', error: error.message });
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
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = HotelBookingController;
