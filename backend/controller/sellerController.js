const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/sellerModel");
const logger = require('../config/logger');
require('dotenv').config();

const seller_jwt_key = process.env.SELLER_JWT_KEY;

module.exports.sellerLogin = async function sellerLogin(req, res) {
    try {
        const data = req.body;
        logger.info(`Seller login attempt for email: ${data.email}`);
        let seller = await sellerModel.findOne({ email: data.email });
        if (seller) {
            const isValid = await bcrypt.compare(data.password, seller.password);
            if (isValid) {
                let uid = seller["_id"];
                let token = jwt.sign({ payload: uid }, seller_jwt_key);
                logger.info(`Seller logged in successfully: ${data.email}`);
                return res.cookie("sellerLoggedin", token, { sameSite: "None", secure: true }).status(200).json({
                    message: "seller logged in"
                });
            }
            else {
                logger.warn(`Seller login failed - wrong password for email: ${data.email}`);
                res.status(401).json({
                    message: "wrong credentials"
                });
            }
        }
        else {
            logger.warn(`Seller login failed - seller not found: ${data.email}`);
            res.status(404).json({
                message: "seller not found"
            })
        }
    }
    catch (err) {
        logger.error(`Seller login error for email ${data.email}: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.sellerSignup = async function sellerSignup(req, res) {
    try {
        let data = req.body;
        logger.info(`Seller signup attempt for email: ${data.email}`);
        let seller = await sellerModel.create(data);
        logger.info(`Seller signed up successfully: ${data.email}`);
        res.status(200).json({
            message: "seller account created"
        });
    }
    catch (err) {
        logger.error(`Seller signup error: ${err.message}`);
        res.status(500).json({
            message: "Server Error!"
        });
    }
}

module.exports.sellerLogout = async function sellerLogout(req, res) {
    try {
        logger.info(`Seller logging out: ${req.user.email}`);
        res.cookie("sellerLoggedin", "", { maxAge: 1, withCredentials: true });
        res.status(200).json({
            message: "seller logged out successfully"
        });
    }
    catch (err) {
        logger.error(`Seller logout error: ${err.message}`);
        res.status(500).json({
            message: "Server Error!"
        });
    }
};

module.exports.currentSeller = async function currentSeller(req, res) {
    try {
        logger.info(`Fetching current seller: ${req.user.email}`);
        res.json(req.user);
    }
    catch (err) {
        logger.error(`Error fetching current seller: ${err.message}`);
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.updateSellerProfile = async function updateSellerProfile(req, res) {
    try {
        let data = { ...req.body };
        if (data.password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        } else {
            delete data.password;
        }
        let seller = await sellerModel.findByIdAndUpdate(req.user._id, data, { new: true }).select('-password');
        logger.info(`Seller profile updated: ${req.user.email}`);
        res.status(200).json({ message: 'Profile updated', seller });
    }
    catch (err) {
        logger.error(`Update seller profile error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};

const orderModel = require('../models/orderModel');
const itemModel = require('../models/itemModel');

module.exports.getSellerOrders = async function getSellerOrders(req, res) {
    try {
        const sellerEmail = req.user.email;
        logger.info(`Fetching orders for seller: ${sellerEmail}`);
        // Get seller's item names
        let sellerItems = await itemModel.find({ sellerEmail }).select('itemname');
        let itemNames = sellerItems.map(i => i.itemname);

        // Find orders containing seller's items
        let orders = await orderModel.find({ 'items.itemname': { $in: itemNames } }).sort({ createdAt: -1 });

        logger.info(`Fetched ${orders.length} orders for seller: ${sellerEmail}`);
        res.status(200).json(orders);
    }
    catch (err) {
        logger.error(`Get seller orders error: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};