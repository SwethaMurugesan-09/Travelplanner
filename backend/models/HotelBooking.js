const mongoose = require('mongoose');
const bookingsSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecificPlace.hotels',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });
const HotelBooking = mongoose.model('HotelBooking',bookingsSchema );

module.exports = HotelBooking;