const cartModel = require("../models/cartModel");
const logger = require('../config/logger');

module.exports.addToCart = async function addToCart(req, res) {
    try {
        let email = req.user.email;
        let data = req.body;
        logger.info(`Adding item to cart for user: ${email} | item: ${data.itemname}`);
        let item = await cartModel.create({ ...data, email: email });

        logger.info(`Item added to cart successfully for user: ${email}`);
        res.status(200).json({
            message: "Item Successfully added to cart"
        })
    }
    catch (err) {
        logger.error(`Add to cart error for user ${req.user.email}: ${err.message}`);
        res.status(404).json({
            message: err.message,
        })
    }
}

module.exports.removeFromCart = async function removeFromCart(req, res) {
    try {
        let email = req.user.email;
        let data = req.body;
        logger.info(`Removing item from cart for user: ${email} | item: ${data.itemname}`);
        let item = await cartModel.deleteOne({ ...data, email: email });

        logger.info(`Item removed from cart successfully for user: ${email}`);
        res.status(200).json({
            message: "Item Successfully deleted from cart"
        })
    }
    catch (err) {
        logger.error(`Remove from cart error for user ${req.user.email}: ${err.message}`);
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports.showCart = async function showCart(req, res) {
    try {
        let email = req.user.email;
        logger.info(`Fetching cart for user: ${email}`);
        let item = await cartModel.find({ email: email });

        logger.info(`Cart fetched for user: ${email} | items: ${item.length}`);
        res.status(200).json(item);
    }
    catch (err) {
        logger.error(`Show cart error for user ${req.user.email}: ${err.message}`);
        res.status(404).json({
            message: err.message,
        })
    }
}