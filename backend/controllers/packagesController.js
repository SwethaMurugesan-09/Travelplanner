const Packages = require('../models/Packages'); // Adjust path as necessary

// Create a new package
const createPackage = async (req, res) => {
    try {
        const { city, imageUrl, description } = req.body;

        // Validate request
        if (!city || !imageUrl || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new package document
        const newPackage = new Packages({
            city,
            imageUrl,
            description
        });

        // Save the package to the database
        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating package', error });
    }
};

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving packages', error });
    }
};

// Export the controller methods
module.exports = {
    createPackage,
    getPackages,
};
