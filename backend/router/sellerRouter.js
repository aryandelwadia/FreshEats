const express = require('express');
const { sellerLogin, sellerSignup, sellerLogout, currentSeller, updateSellerProfile, getSellerOrders } = require('../controller/sellerController');
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

sellerRouter
    .route('/updateprofile')
    .put(isSellerLoggedIn, updateSellerProfile);

sellerRouter
    .route('/orders')
    .get(isSellerLoggedIn, getSellerOrders);

module.exports = sellerRouter;