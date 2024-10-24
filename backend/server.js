const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/travelRoutes');
const placesRoutes =require('./routes/placesRoutes');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const userRouter = require('./routes/userRoutes');
const specificRoutes = require('./routes/specificRoutes');
const specificPlaceRoutes = require('./routes/detailsRouter');

dotenv.config();

const app = express();
app.use(cors({}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // This parses URL-encoded bodies (if needed)

const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


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
    image_url: `${process.env.BASE_URL}/images/${req.file.filename}` 
  });
});




app.use('/images', express.static('upload/images'));

connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: err.message });
});

app.use('/api', travelRoutes);
app.use('/api', placesRoutes );
app.use('/signup' ,userRouter);
app.use('/api/specificplace', specificRoutes);
app.use('/api', specificPlaceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
