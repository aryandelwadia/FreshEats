const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/sellerModel");
const logger = require('../config/logger');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const seller_jwt_key = process.env.SELLER_JWT_KEY;

module.exports.sellerLogin = async function sellerLogin(req, res) {
    const data = req.body;
    logger.info(`Seller login attempt for email: ${data.email}`);
    let seller = await sellerModel.findOne({ email: data.email });
    try {
        if (seller) {
            const isValid = await bcrypt.compareSync(data.password, seller.password);
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