const express = require("express");
const { addToCart, removeFromCart, showCart, updateQuantity, placeOrder, getOrders } = require("../controller/cartController");
const { isUserLoggedIn } = require("../middlewares/auth.middleware");

const cartRouter = express.Router();

cartRouter
    .route('/addItem')
    .post(isUserLoggedIn, addToCart);

cartRouter
    .route('/removeItem')
    .post(isUserLoggedIn, removeFromCart);

cartRouter
    .route('/showItem')
    .post(isUserLoggedIn, showCart);

cartRouter
    .route('/updateQuantity')
    .post(isUserLoggedIn, updateQuantity);

cartRouter
    .route('/placeOrder')
    .post(isUserLoggedIn, placeOrder);

cartRouter
    .route('/orders')
    .get(isUserLoggedIn, getOrders);

module.exports = cartRouter;