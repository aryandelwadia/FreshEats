const express = require('express');
const app = express();
const { loginUser, signupUser } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);
// .get(getloginUser);

userRouter
.route('/signup')
.post(signupUser);

module.exports = userRouter;