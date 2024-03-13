const express = require('express');
const app = express();
const { loginUser, signupUser, protectRoute, getUsers } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);

userRouter
.route('/signup')
.post(signupUser);

module.exports = userRouter;