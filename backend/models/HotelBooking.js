const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    email: {  
        type: String,
        required: true,
    },
    hotelId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecificPlace.hotels',  
        required: true,
    },   
    bookingDate: {
        type: Date,
        required: true,
    },
    numberOfPersons: {
        type: Number,
        required: true,
    },
    numberOfDays: {
        type: Number,
        required: true,
    },
    personsAges: [Number], 
    foodPreference: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true,
    },
    acPreference: {
        type: String,
        enum: ['AC', 'Non-AC'],
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

const HotelBooking = mongoose.model('HotelBooking', bookingsSchema);

module.exports = HotelBooking;
