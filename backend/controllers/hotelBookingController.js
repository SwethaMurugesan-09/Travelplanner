const HotelBooking = require('../models/HotelBooking');
const SpecificPlace = require('../models/SpecificPlace');
const User = require('../models/Users'); // Assuming you have a User model

const HotelBookingController = {
  
  // Create a new hotel booking
  async createBooking(req, res) {
    try {
      const { email, hotelId, bookingDate, amountPaid } = req.body;

      // Validate user existence
      const user = await User.findById(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Validate hotel existence within SpecificPlace
      const specificPlace = await SpecificPlace.findOne({ "hotels._id": hotelId });
      if (!specificPlace) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      // Create new booking
      const newBooking = new HotelBooking({
        email,
        hotel: hotelId,
        bookingDate,
        amountPaid,
        status: 'pending', // Default status
      });

      // Save booking to the database
      await newBooking.save();
      return res.status(201).json({ message: 'Booking successful', booking: newBooking });
      
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get a specific booking by ID
  async getBookingById(req, res) {
    try {
      const bookingId = req.params.id;
      const booking = await HotelBooking.findById(bookingId).populate('email').populate('hotel');

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      return res.status(200).json({ booking });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update booking status (optional)
  async updateBookingStatus(req, res) {
    try {
      const bookingId = req.params.id;
      const { status } = req.body;

      // Validate status
      if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid booking status' });
      }

      // Update booking status
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
};

module.exports = HotelBookingController;
