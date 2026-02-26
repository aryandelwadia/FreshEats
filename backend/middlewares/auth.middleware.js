const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');
const logger = require('../config/logger');
require('dotenv').config();

const jwt_key = process.env.JWT_KEY;
const seller_jwt_key = process.env.SELLER_JWT_KEY;

module.exports.isUserLoggedIn = async function isUserLoggedIn(req, res, next) {
    try {
        const token = req.cookies.loggedin;
        if (!token) {
            logger.warn(`Auth failed - no token provided | ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
            return res.status(401).json({
                message: "User Not Logged In"
            });
        }

        const decoded = jwt.verify(token, jwt_key);
        const user = await userModel.findById(decoded.payload);

        if (!user) {
            logger.warn(`Auth failed - user not found for ID: ${decoded.payload} | ${req.method} ${req.originalUrl}`);
            return res.status(401).json({
                message: "User not found"
            });
        }

        logger.info(`User authenticated: ${user.email} | ${req.method} ${req.originalUrl}`);
        req.user = user;
        next();
    }
    catch (err) {
        logger.error(`Auth error: ${err.message} | ${req.method} ${req.originalUrl}`);
        return res.status(401).json({
            message: "Unauthorized: " + err.message
        });
    }
};

module.exports.isSellerLoggedIn = async function isSellerLoggedIn(req, res, next) {
    try {
        const token = req.cookies.sellerLoggedin;
        if (!token) {
            logger.warn(`Seller auth failed - no token provided | ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
            return res.status(401).json({
                message: "Seller Not Logged In"
            });
        }

        const decoded = jwt.verify(token, seller_jwt_key);
        const seller = await sellerModel.findById(decoded.payload);

        if (!seller) {
            logger.warn(`Seller auth failed - seller not found for ID: ${decoded.payload} | ${req.method} ${req.originalUrl}`);
            return res.status(401).json({
                message: "Seller not found"
            });
        }

        logger.info(`Seller authenticated: ${seller.email} | ${req.method} ${req.originalUrl}`);
        req.user = seller;
        next();
    }
    catch (err) {
        logger.error(`Seller auth error: ${err.message} | ${req.method} ${req.originalUrl}`);
        return res.status(401).json({
            message: "Unauthorized: " + err.message
        });
    }
};

const admin_jwt_key = process.env.ADMIN_JWT_KEY || 'admin_secret_key_fresheats';

module.exports.isAdminLoggedIn = async function isAdminLoggedIn(req, res, next) {
    try {
        const token = req.cookies.adminLoggedin;
        if (!token) {
            logger.warn(`Admin auth failed - no token provided | ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
            return res.status(401).json({
                message: "Admin Not Logged In"
            });
        }

        const decoded = jwt.verify(token, admin_jwt_key);
        if (decoded.role !== 'admin') {
            logger.warn(`Admin auth failed - invalid role | ${req.method} ${req.originalUrl}`);
            return res.status(403).json({
                message: "Access denied"
            });
        }

        logger.info(`Admin authenticated | ${req.method} ${req.originalUrl}`);
        req.admin = decoded;
        next();
    }
    catch (err) {
        logger.error(`Admin auth error: ${err.message} | ${req.method} ${req.originalUrl}`);
        return res.status(401).json({
            message: "Unauthorized: " + err.message
        });
    }
};
