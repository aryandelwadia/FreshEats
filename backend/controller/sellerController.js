const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/sellerModel");
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
    let seller = await sellerModel.findOne({ email: data.email });
    try {
        if (seller) {
            const isValid = await bcrypt.compareSync(data.password, seller.password);
            if (isValid) {
                let uid = seller["_id"];
                let token = jwt.sign({ payload: uid }, seller_jwt_key);
                return res.cookie("sellerLoggedin", token, { sameSite: "None", secure: true }).status(200).json({
                    message: "seller logged in"
                });
            }
            else {
                res.status(401).json({
                    message: "wrong credentials"
                });
            }
        }
        else {
            res.status(404).json({
                message: "seller not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.sellerSignup = async function sellerSignup(req, res) {
    try {
        let data = req.body;
        let seller = await sellerModel.create(data);
        res.status(200).json({
            message: "seller account created"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error!"
        });
    }
}

module.exports.sellerLogout = async function sellerLogout(req, res) {
    try {
        res.cookie("sellerLoggedin", "", { maxAge: 1, withCredentials: true });
        res.status(200).json({
            message: "seller logged out successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error!"
        });
    }
};

module.exports.currentSeller = async function currentSeller(req, res) {
    try {
        res.json(req.user);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
};