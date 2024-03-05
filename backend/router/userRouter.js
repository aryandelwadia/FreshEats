const express = require('express');
const app = express();
const { loginUser } = require('../controller/userController');

const userRouter = express.Router();

userRouter
.route('/login')
.post(loginUser);
// .get(getloginUser);

module.exports = userRouter;