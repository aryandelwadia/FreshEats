const express = require('express');
const app = express();
const { sellerLogin, sellerSignup, sellerLogout, currentSeller } = require('../controller/sellerController');

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

sellerRouter
.route('/currentseller')
.get(currentSeller);

module.exports = sellerRouter;