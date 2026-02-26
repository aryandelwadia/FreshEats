const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const logger = require('../config/logger');

module.exports.addToCart = async function addToCart(req, res) {
    try {
        let email = req.user.email;
        let data = req.body;
        logger.info(`Adding item to cart for user: ${email} | item: ${data.itemname}`);
        let item = await cartModel.create({ ...data, email: email, quantity: data.quantity || 1 });

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
        let id = req.body.id;
        logger.info(`Removing item from cart for user: ${email} | itemId: ${id}`);
        await cartModel.findByIdAndDelete(id);

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

module.exports.updateQuantity = async function updateQuantity(req, res) {
    try {
        let email = req.user.email;
        let { id, quantity } = req.body;
        logger.info(`Updating quantity for user: ${email} | itemId: ${id} | quantity: ${quantity}`);

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        let item = await cartModel.findOneAndUpdate(
            { _id: id, email: email },
            { quantity: quantity },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        logger.info(`Quantity updated for user: ${email} | itemId: ${id}`);
        res.status(200).json(item);
    }
    catch (err) {
        logger.error(`Update quantity error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
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

module.exports.placeOrder = async function placeOrder(req, res) {
    try {
        let email = req.user.email;
        let { deliveryAddress } = req.body;
        logger.info(`Placing order for user: ${email}`);

        if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode || !deliveryAddress.phone) {
            return res.status(400).json({ message: "Delivery address is required" });
        }

        let cartItems = await cartModel.find({ email: email });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let subtotal = 0;
        let orderItems = cartItems.map(item => {
            subtotal += item.itemprice * item.quantity;
            return {
                itemname: item.itemname,
                itemprice: item.itemprice,
                quantity: item.quantity,
                prodplace: item.prodplace,
                img: item.img
            };
        });

        let shipping = 1.99;
        let total = subtotal + shipping;

        let order = await orderModel.create({
            email: email,
            items: orderItems,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            deliveryAddress: deliveryAddress
        });

        // Clear the cart after placing order
        await cartModel.deleteMany({ email: email });

        logger.info(`Order placed for user: ${email} | orderId: ${order._id} | total: $${total}`);
        res.status(200).json({
            message: "Order placed successfully",
            order: order
        });
    }
    catch (err) {
        logger.error(`Place order error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getOrders = async function getOrders(req, res) {
    try {
        let email = req.user.email;
        logger.info(`Fetching orders for user: ${email}`);
        let orders = await orderModel.find({ email: email }).sort({ createdAt: -1 });
        logger.info(`Fetched ${orders.length} orders for user: ${email}`);
        res.status(200).json(orders);
    }
    catch (err) {
        logger.error(`Get orders error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}