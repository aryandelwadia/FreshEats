const express = require('express');
const app = express();

const { loginUser, signupUser, logoutUser, currentUser, protectRoute, userProfilePic } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);

userRouter
.route('/signup')
.post(signupUser);

userRouter
.route('/logout')
.post(protectRoute)
.post(logoutUser);

userRouter
.route('/currentUser')
.get(currentUser);

userRouter
.route('/profilePic')
.post(userProfilePic);

module.exports = userRouter;