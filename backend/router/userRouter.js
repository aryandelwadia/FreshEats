const express = require('express');
const app = express();

const { loginUser, signupUser, logoutUser, currentUser, protectRoute } = require('../controller/userController');

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

module.exports = userRouter;