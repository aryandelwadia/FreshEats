const express = require("express");
const app = express();

const { addToCart, removeFromCart, showCart } = require("../controller/cartController");

const cartRouter = express.Router();

cartRouter
.route('/addItem')
.post(addToCart);

cartRouter
.route('/removeItem')
.post(removeFromCart);

cartRouter
.route('/showItem')
.post(showCart);

module.exports = cartRouter;