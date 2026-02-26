const express = require('express');
const { sellerLogin, sellerSignup, sellerLogout, currentSeller } = require('../controller/sellerController');
const { isSellerLoggedIn } = require('../middlewares/auth.middleware');

const sellerRouter = express.Router();

sellerRouter
    .route('/login')
    .post(sellerLogin);

sellerRouter
    .route('/signup')
    .post(sellerSignup);

sellerRouter
    .route('/logout')
    .post(isSellerLoggedIn, sellerLogout);

sellerRouter
    .route('/currentseller')
    .get(isSellerLoggedIn, currentSeller);

module.exports = sellerRouter;