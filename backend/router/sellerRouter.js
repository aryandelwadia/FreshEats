const express = require('express');
const app = express();
const { sellerLogin, sellerSignup, sellerLogout } = require('../controller/sellerController');

const sellerRouter = express.Router();

sellerRouter
.route('/login')
.post(sellerLogin);

sellerRouter
.route('/signup')
.post(sellerSignup);

sellerRouter
.route('/logout')
.post(sellerLogout);

module.exports = sellerRouter;