const mongoose = require('mongoose');
const HotelBooking = require('../models/HotelBooking');
const SpecificPlace =require('../models/SpecificPlace')
const HotelBookingController = {
  async createBooking(req, res) {
    try {
      console.log("Received Request Body:", req.body);
  
      const { email, hotelId, bookingDate, numberOfPersons, numberOfDays, personsDetails } = req.body;
  
      // Check if required fields are present
      if (!email || !hotelId || !bookingDate || !numberOfPersons || !numberOfDays) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Fetch the SpecificPlace document
      const specificPlace = await SpecificPlace.findOne({
        'hotels._id': hotelId, // Match the hotelId within the hotels array
      });
  
      if (!specificPlace || !specificPlace.hotels) {
        return res.status(404).json({ message: 'SpecificPlace or hotels array not found' });
      }
  
      // Find the hotel in the hotels array
      const hotel = specificPlace.hotels.find((h) => h._id.toString() === hotelId);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      // Create the booking with hotelName
      const newBooking = new HotelBooking({
        email,
        hotelId,
        hotelName: hotel.name,
        bookingDate,
        numberOfPersons,
        numberOfDays,
        personsDetails,
      });
  
      // Save the booking to the database
      await newBooking.save();
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  ,
  async getBookingsByEmail(req, res) {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      // Fetch bookings directly with the hotel name
      const bookings = await HotelBooking.find({ email });
  
      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found' });
      }
  
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
,  
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
      const bookingId = req.params.bookingId;
      const personIndex = parseInt(req.params.personIndex, 10);
  
      // Validate personIndex is a number and within bounds
      if (isNaN(personIndex)) {
        return res.status(400).json({ message: 'Invalid person index' });
      }
  
      // Find the booking by ID
      const booking = await HotelBooking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Check if the personIndex is within bounds
      if (personIndex < 0 || personIndex >= booking.personsDetails.length) {
        return res.status(400).json({ message: 'Invalid person index' });
      }
  
      booking.personsDetails.splice(personIndex, 1);
  
      if (booking.personsDetails.length === 0) {
        await HotelBooking.findByIdAndDelete(bookingId);
        return res.status(200).json({ message: 'Booking deleted as no persons are left' });
      }
  
      await booking.save();
  
      return res.status(200).json({ message: 'Person removed from booking successfully', booking });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  async totalCancellation(req, res) {
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
