const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/travelRoutes');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware for CORS and JSON parsing
app.use(cors({}));
app.use(express.json());

// Ensure the 'upload/images' directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images (jpg, png) are allowed'));
    }
  }
});


app.post("/upload", upload.single('Travel'), (req, res) => {
  if (!req.file) {
    console.error("No file uploaded.");
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  
  console.log("File uploaded successfully:", req.file);

  res.json({
    success: 1,
    message: "File uploaded successfully",
    image_url: `${process.env.BASE_URL}/images/${req.file.filename}` // Use environment variable for base URL
  });
});


// Serve static files from the 'upload/images' directory
app.use('/images', express.static('upload/images'));

// Connect to the database
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ message: err.message });
});

// Travel API routes
app.use('/api', travelRoutes);

// Start the server on a port defined in the environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
