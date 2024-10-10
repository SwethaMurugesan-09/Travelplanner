const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/travelRoutes'); 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

connectDB(); 

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use('/api', travelRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
