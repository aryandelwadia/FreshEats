const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const upload = require('../config/multerConfig');
const logger = require('../config/logger');

const jwt_key = process.env.JWT_KEY;

module.exports.loginUser = async function loginUser(req, res) {
    try {
        const data = req.body;
        logger.info(`Login attempt for email: ${data.email}`);
        let user = await userModel.findOne({ email: data.email });

        if (user) {
            const match = await bcrypt.compare(data.password, user.password);
            if (match) {
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

            if (!req.file) {
                logger.warn(`No file provided for profile pic upload by user: ${req.user.email}`);
                return res.status(400).json({
                    message: "No file uploaded"
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

module.exports.addAddress = async function addAddress(req, res) {
    try {
        const userId = req.user._id;
        const { label, street, city, state, pincode, phone } = req.body;
        logger.info(`Adding address for user: ${req.user.email}`);

        if (!street || !city || !state || !pincode || !phone) {
            return res.status(400).json({ message: "All address fields are required" });
        }

        let user = await userModel.findByIdAndUpdate(
            userId,
            { $push: { addresses: { label: label || "Home", street, city, state, pincode, phone } } },
            { new: true }
        );

        logger.info(`Address added for user: ${req.user.email}`);
        res.status(200).json({ addresses: user.addresses });
    }
    catch (err) {
        logger.error(`Add address error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getAddresses = async function getAddresses(req, res) {
    try {
        logger.info(`Fetching addresses for user: ${req.user.email}`);
        let user = await userModel.findById(req.user._id).select('addresses');
        res.status(200).json({ addresses: user.addresses || [] });
    }
    catch (err) {
        logger.error(`Get addresses error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}

module.exports.deleteAddress = async function deleteAddress(req, res) {
    try {
        const userId = req.user._id;
        const { addressId } = req.body;
        logger.info(`Deleting address ${addressId} for user: ${req.user.email}`);

        let user = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { addresses: { _id: addressId } } },
            { new: true }
        );

        logger.info(`Address deleted for user: ${req.user.email}`);
        res.status(200).json({ addresses: user.addresses });
    }
    catch (err) {
        logger.error(`Delete address error for user ${req.user.email}: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
}