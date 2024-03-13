const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const jwt_key = "wieuhfwiuefnq084f0cndasjec218coh23ecn8o9denc23ydo2d3m2839cdyh23";

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
                // res.cookie('isLoggedIn', true, {httpOnly: true});
                let uid = user['_id'];
                let token = jwt.sign({payload: uid}, jwt_key);
                res.cookie("isLoggedIn", token, {httpOnly: true});
                res.json({
                    message: "Logged in successfully", 
                });
                return "valid";
            }
            else{
                res.status(401).json({
                    message: "wrong credentials"
                })
                return false;
            }
        }
        else{
            res.json({
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

module.exports.signupUser = async function signupUser(req, res){
    try{
        const data = req.body;
        let user = await userModel.create(data);
        res.json({
            message: 'user signed up'
        });
        
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next){
    if(req.cookies.isLoggedIn){
        let isverified = jwt.verify(req.cookies.isLoggedIn,jwt_key);
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
        res.redirect('http://localhost:5173/login');
    }
}

