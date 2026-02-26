const express = require('express');
const app = express();
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = require('../config/multerConfig');
const logger = require('../config/logger');

app.use(cors());
app.use(cookieParser());

const jwt_key = process.env.JWT_KEY;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports.loginUser = async function loginUser(req, res) {
    try {
        const data = req.body;
        logger.info(`Login attempt for email: ${data.email}`);
        let user = await userModel.findOne({ email: data.email });

        if (user) {
            const match = await bcrypt.compare(data.password, user.password);
            if (match) {
                loggedUser = user;
                let uid = user['_id'];
                let token = jwt.sign({ payload: uid }, jwt_key);
                logger.info(`User logged in successfully: ${data.email}`);
                res.cookie("loggedin", token, { sameSite: "None", secure: true, httpOnly: false, withCredentials: true }).status(200).json({
                    message: "Logged in successfully",
                });
            }
            else {
                logger.warn(`Login failed - wrong password for email: ${data.email}`);
                res.status(401).json({
                    message: "wrong credentials"
                })
                return false;
            }
        }
        else {
            logger.warn(`Login failed - user not found: ${data.email}`);
            res.status(404).json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        logger.error(`Login error for email ${req.body.email}: ${err.message}`);
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.currentUser = async function currentUser(req, res) {
    try {
        logger.info(`Fetching current user: ${req.user.email}`);
        res.json(req.user);
    } catch (err) {
        logger.error(`Error fetching current user: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.signupUser = async function signupUser(req, res) {
    try {
        const data = req.body;
        logger.info(`Signup attempt for email: ${data.email}`);

        {
            let user = await userModel.create(data);
            logger.info(`User signed up successfully: ${data.email}`);
            res.status(200).json({
                message: 'user signed up'
            });
        }

    }
    catch (err) {
        logger.error(`Signup error for email ${req.body.email}: ${err.message}`);
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.logoutUser = async function logoutUser(req, res) {
    try {
        logger.info(`User logging out: ${req.user.email}`);
        res.cookie('loggedin', '', { maxAge: 1, withCredentials: true });
        res.status(200).json({
            message: "user logged out successfully",
        });
    }
    catch (err) {
        logger.error(`Logout error: ${err.message}`);
        res.status(404).json({
            message: err.message
        });
    }
};



module.exports.userProfilePic = async function userProfilePic(req, res) {
    try {
        const uid = req.user._id;
        logger.info(`Profile pic upload attempt by user: ${req.user.email}`);

        upload.single("image")(req, res, async function (err) {
            if (err) {
                logger.error(`Profile pic upload failed for user ${req.user.email}: ${err.message}`);
                return res.status(400).json({
                    message: err.message
                });
            }

            let user = await userModel.findOneAndUpdate({ _id: uid }, { profilePic: req.file.filename }, { new: true });
            logger.info(`Profile pic updated successfully for user: ${req.user.email} | file: ${req.file.filename}`);
            res.status(200).json({
                message: "File Uploaded Successfully",
            })
        });
    }
    catch (err) {
        logger.error(`Profile pic error for user ${req.user.email}: ${err.message}`);
        res.status(404).json({
            message: err.message
        })
    }
}