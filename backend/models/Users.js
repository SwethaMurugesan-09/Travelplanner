const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image:{
        type:String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    number: {
        type: String,
        match: [/^\d{10}$/, 'Invalid phone number'], // Example for a 10-digit number
    },
    age:{
        type: String,
    },
    dob:{
        type: String,
    }, 
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packages',
        default: [],
    }],
    
}, {
    timestamps: true, 
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
