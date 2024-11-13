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
            age:req.body.age,
            dob:req.body.dob,
            number:req.body.number,
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


exports.getUserProfile = async (req, res) => {
    try {
        // Extract token from headers
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
        }

        const decoded = jwt.verify(token, 'travelplanner');
        const userId = decoded.user.id;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        // Extract token from headers
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
        }

        // Verify token and extract user ID
        const decoded = jwt.verify(token, 'travelplanner');
        const userId = decoded.user.id;

        // Define the fields that can be updated
        const updatedData = {};
        if (req.body.username) updatedData.name = req.body.username;
        if (req.body.email) updatedData.email = req.body.email;
        if (req.body.age) updatedData.age = req.body.age;
        if (req.body.dob) updatedData.dob = req.body.dob;
        if (req.body.number) updatedData.number = req.body.number;

        // Update user in the database
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true, runValidators: true } // Return the updated user
        ).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
};
