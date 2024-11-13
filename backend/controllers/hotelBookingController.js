const HotelBooking = require('../models/HotelBooking');
const SpecificPlace = require('../models/SpecificPlace');
const User = require('../models/Users'); // Assuming you have a User model

const HotelBookingController = {

  async createBooking(req, res) {
    try {
      const { email, hotelId, bookingDate, numberOfPersons, numberOfDays, personsDetails } = req.body;
      console.log(email, hotelId);
      console.log('Request Body:', req.body);

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Validate hotel existence within SpecificPlace
      const specificPlace = await SpecificPlace.findOne({ "hotels._id": hotelId });
      if (!specificPlace) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      // Find the hotel details to calculate the total amount
      const hotel = specificPlace.hotels.id(hotelId);
      const totalAmount = hotel.amount * numberOfDays * numberOfPersons;

      // Create new booking
      const newBooking = new HotelBooking({
        email,  // Use email in the booking model
        hotelId,
        bookingDate,
        numberOfPersons,
        numberOfDays,
        personsDetails,
        amountPaid: totalAmount,
        status: 'pending',
      });

      // Save booking to the database
      await newBooking.save();

      return res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get booking by ID
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

  // Get all bookings for a specific user by email
  async getBookingsByUser(req, res) {
    try {
      const email = req.user.email; // Assuming user is authenticated with a middleware

      const bookings = await HotelBooking.find({ email }).populate('hotelId');

      if (!bookings.length) {
        return res.status(404).json({ message: 'No bookings found' });
      }

      return res.status(200).json({ bookings });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update booking status
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

  // Delete a booking by ID
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
