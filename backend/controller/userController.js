const express = require('express');
const app = express();
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

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

module.exports.loginUser = async function loginUser(req, res){
    try{
        const data = req.body;
        let user = await userModel.findOne({email: data.email});
        
        if(user){
            const match = await bcrypt.compare(data.password, user.password);
            if(match){
                loggedUser = user;
                let uid = user['_id'];
                let token = jwt.sign({payload: uid}, jwt_key);
                res.cookie("loggedin", token, {sameSite: "None", secure: true, httpOnly: false, withCredentials: true }).status(200).json({
                    message: "Logged in successfully",
                });
            }
            else{
                res.status(401).json({
                    message: "wrong credentials"
                })
                return false;
            }
        }
        else{
            res.status(404).json({
                message: "user not found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.currentUser = async function currentUser(req, res){
    try {
        let token = req.cookies.loggedin;
        let payload = jwt.verify(token, jwt_key);
        const uid = payload.payload;
        const user = await userModel.findById(uid);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ 
                message: "user not found" 
            });
        }
        return true;

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
        return false;
    }
};

module.exports.signupUser = async function signupUser(req, res){
    try{
        const data = req.body;
        
        {
            let user = await userModel.create(data);
            res.status(200).json({
                message: 'user signed up'
            });
        }
        
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
};

module.exports.logoutUser = async function logoutUser(req, res){
    try{
        res.cookie('loggedin', '', {maxAge: 1, withCredentials: true});
        res.status(200).json({
            message: "user logged out successfully",
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message
        });
    }
};

module.exports.protectRoute = async function protectRoute(req, res, next){
    if(req.cookies.isLoggedIn){
        let isverified = jwt.verify(req.cookies.loggedin,jwt_key);
        if(isverified){
            next();
        }
        else{
            res.status(404).json({
                message: "user not verified"
            });
        }
    }
    else{
        res.json({
            message: 'User Not Logged In'
        });
    }
};
