const express = require('express');
const app = express();
const { loginUser, signupUser, logoutUser, checkUserDuplicate } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);

userRouter
.route('/signup')
.post(signupUser);
// .post(checkUserDuplicate, signupUser); <-- duplicate function not working

userRouter
.route('/logout')
.post(logoutUser);

module.exports = userRouter;