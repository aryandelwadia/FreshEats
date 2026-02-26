const express = require('express');
const { loginUser, signupUser, logoutUser, currentUser, userProfilePic } = require('../controller/userController');
const { isUserLoggedIn } = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter
    .route('/login')
    .post(loginUser);

userRouter
    .route('/signup')
    .post(signupUser);

userRouter
    .route('/logout')
    .post(isUserLoggedIn, logoutUser);

userRouter
    .route('/currentUser')
    .get(isUserLoggedIn, currentUser);

userRouter
    .route('/profilePic')
    .post(isUserLoggedIn, userProfilePic);

module.exports = userRouter;