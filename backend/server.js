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
const packagesrouter = require('./routes/packagesRoutes');
const hotelrouter = require('./routes/hotelRouter');

dotenv.config();

const app = express();

const allowedOrigins = [
    'https://travey.onrender.com/',
  ...Array.from({length: 65535}, (_, i)=>`http://localhost:${i+1}`)
]

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}

connectDB();

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.get("/",(req,res)=>{
  res.json("Hello");
})

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
  limits: { fileSize: 500 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");

    if (isImage) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only image files are allowed'));
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



app.post('/upload/profile-image', upload.single('Users'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    user.image = imageUrl;
    await user.save();

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      image_url: imageUrl,
    });
  } catch (err) {
    console.error('Error uploading profile image:', err);
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File size is too large' });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ message: err.message });
});

app.use('/api', travelRoutes);
app.use('/api', placesRoutes );
app.use('/signup' ,userRouter);
app.use('/api/specificplace', specificRoutes);
app.use('/api', hotelrouter);
app.use('/package',packagesrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
