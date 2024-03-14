const express = require('express');
const app = express();
const { loginUser, signupUser, logoutUser } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);

userRouter
.route('/signup')
.post(signupUser);

userRouter
.route('/logout')
.post(logoutUser);

module.exports = userRouter;