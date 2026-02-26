const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');
require('dotenv').config();

const jwt_key = process.env.JWT_KEY;
const seller_jwt_key = process.env.SELLER_JWT_KEY;

module.exports.isUserLoggedIn = async function isUserLoggedIn(req, res, next) {
    try {
        const token = req.cookies.loggedin;
        if (!token) {
            return res.status(401).json({
                message: "User Not Logged In"
            });
        }

        const decoded = jwt.verify(token, jwt_key);
        const user = await userModel.findById(decoded.payload);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized: " + err.message
        });
    }
};

module.exports.isSellerLoggedIn = async function isSellerLoggedIn(req, res, next) {
    try {
        const token = req.cookies.sellerLoggedin;
        if (!token) {
            return res.status(401).json({
                message: "Seller Not Logged In"
            });
        }

        const decoded = jwt.verify(token, seller_jwt_key);
        const seller = await sellerModel.findById(decoded.payload);

        if (!seller) {
            return res.status(401).json({
                message: "Seller not found"
            });
        }

        req.user = seller;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized: " + err.message
        });
    }
};
