const Packages = require('../models/Packages'); // Adjust path as necessary

// Create a new package
const createPackage = async (req, res) => {
    try {
        const { city, imageUrl, description ,rate} = req.body;

        if (!city || !imageUrl || !description ||!rate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPackage = new Packages({
            city,
            imageUrl,
            description,
            rate
        });

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

const getPackageById = async (req, res) => {
    try {
        const packageId = req.params.id;
        const packageDetails = await Packages.findById(packageId);

        if (!packageDetails) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json(packageDetails);
    } catch (error) {
        console.error('Error retrieving package by ID:', error);
        res.status(500).json({ message: 'Error retrieving package by ID', error });
    }
};

module.exports = {
    createPackage,
    getPackages,
    getPackageById,
};
