const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Signup Controller
exports.signup = async (req, res) => {
    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: 'User already exists' });
        }

        // Create a new user instance
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // Save the new user to the database
        await user.save();

        // Create a token
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');

        // Return the token as response
        res.json({ success: true, token });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, errors: 'Wrong Email ID' });
        }

        // Validate the password
        const isPasswordCorrect = req.body.password === user.password;
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, errors: 'Wrong Password' });
        }

        // Create a token
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'travelplanner');

        // Return the token as response
        res.json({ success: true, token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
};
