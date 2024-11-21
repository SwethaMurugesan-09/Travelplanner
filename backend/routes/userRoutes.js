const express = require('express');
const userRouter = express.Router();
const { signup, login, getUserProfile, updateUserProfile, addToFavourites,getFavourites,removeFromFavourites } = require('../controllers/userController');

userRouter.post('/signup', signup);
userRouter.get('/profile', getUserProfile);
userRouter.put('/profile', updateUserProfile);
userRouter.post('/login', login);
userRouter.put('/addtofav', addToFavourites);
userRouter.get('/favourites', getFavourites);
userRouter.delete('/removefromfav',removeFromFavourites);
module.exports = userRouter;
