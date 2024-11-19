const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecificPlace', required: true }, // Reference to SpecificPlace
  bookingDate: { type: Date, required: true },
  numberOfPersons: { type: Number, required: true },
  numberOfDays: { type: Number, required: true },
  personsDetails: [{ age: Number, foodPreference: String, acPreference: String}]
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
