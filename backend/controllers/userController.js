const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const Packages = require('../models/Packages'); // Adjust path as necessary
const mongoose = require('mongoose');

exports.signup = async (req, res) => {
    try {
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
            favourites: [], 
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

exports.addToFavourites = async (req, res) => {
    const { userId, packageId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      if (!user.favourites) {
        user.favourites = [];
      }
  
      if (user.favourites.includes(packageId)) {
        return res.status(400).json({ success: false, message: 'Package already in favourites' });
      }
  
      user.favourites.push(packageId);
      await user.save();
  
      res.json({ success: true, message: 'Package added to favourites' });
    } catch (err) {
      console.error('Error adding package to favourites:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

  exports.getFavourites = async (req, res) => {
      try {
          const { userId } = req.query;
  
          // Validate userId
          if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
              return res.status(400).json({ 
                  success: false, 
                  message: 'Invalid or missing userId' 
              });
          }
  
          const user = await User.findById(userId).populate('favourites');
          if (!user) {
              return res.status(404).json({ 
                  success: false, 
                  message: 'User not found' 
              });
          }
  
          res.json({ success: true, packages: user.favourites });
      } catch (error) {
          console.error('Error fetching favourites:', error);
          res.status(500).json({ 
              success: false, 
              message: 'Internal Server Error', 
              error: error.message 
          });
      }
  };
  