const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
    email: { type: String, required: true },
    hotelId: { type: mongoose.Types.ObjectId, required: true },
    bookingDate: { type: Date, required: true },
    numberOfPersons: { type: Number, required: true },
    numberOfDays: { type: Number, required: true },
    personsDetails: [
        {
            age: { type: Number, required: true },
            foodPreference: { type: String, required: true },
            acPreference: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
