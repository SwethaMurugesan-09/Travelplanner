const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    age:{
        type: String,
    },
    dob:{
        type: String,
    },
    number:{
        type:String,
    },
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SpecificPlace',
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookings',
        }
    ]    
    
}, {
    timestamps: true, 
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
