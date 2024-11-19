const express = require('express');
const userRouter = express.Router();
const { signup, login, getUserProfile, updateUserProfile, addToFavourites } = require('../controllers/userController');

userRouter.post('/signup', signup);
userRouter.get('/profile', getUserProfile);
userRouter.put('/profile', updateUserProfile);
userRouter.post('/login', login);
userRouter.put('/addtofav', addToFavourites);

module.exports = userRouter;
