const express = require('express');
const { loginUser, signupUser, logoutUser, currentUser, userProfilePic, addAddress, getAddresses, deleteAddress } = require('../controller/userController');
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

userRouter
    .route('/address')
    .get(isUserLoggedIn, getAddresses)
    .post(isUserLoggedIn, addAddress);

userRouter
    .route('/address/delete')
    .post(isUserLoggedIn, deleteAddress);

module.exports = userRouter;