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
}, {
    timestamps: true, 
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
