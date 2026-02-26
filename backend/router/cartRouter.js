const express = require("express");
const { addToCart, removeFromCart, showCart } = require("../controller/cartController");
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

module.exports = cartRouter;