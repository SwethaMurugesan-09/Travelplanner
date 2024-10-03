const port = 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require('dotenv').config();  
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    dbName: 'travelplanner', 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection error:", err));

app.get("/", (req, res) => {
    res.send("Express app is running");
});



app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Server connection error: " + error);
    }
});
