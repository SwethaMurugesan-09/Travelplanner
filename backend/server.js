const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/travelRoutes'); // Import the correct travelRoutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON

connectDB(); // Connect to the database

// Middleware for handling errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Use the travel routes
app.use('/api', travelRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
