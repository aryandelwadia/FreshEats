const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const jwt_key = "wieuhfwiuefnq084f0cndasjec218coh23ecn8o9denc23ydo2d3m2839cdyh23";

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let loggedUser = null;

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
                res.cookie("loggedin", token, {sameSite: "None", secure: true, httpOnly: true }).status(200).json({
                    message: "Logged in successfully",
                    currentUser: loggedUser
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
            res.json(user)
        }
        else {
            res.status(404).json({ msg: "user not found" })
        }
        return true;

    } catch (err) {
        res.json({
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
            currentUser: loggedUser
        });
    }
    catch(err){
        res.status(404).json({
            message: err.message
        });
    }
};

module.exports.checkUserDuplicate = async function checkUserDuplicate(req,res,next){
    let username = req.body.username;
    let user1 = await  userModel.findOne({username: username});
    let email = req.body.email;
    let user2 = await userModel.findOne({email: email});
    let number = req.body.number;
    let user3 = await userModel.findOne({number : number});
    if(user1 || user2 || user3){
        res.status(440).json({
            message: "dup"
        })
    }
    else{
        next();
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
        res.redirect('http://localhost:5173/login');
    }
};

module.exports.getUserCookie = async function getUserCookie(req, res, next){
    if(req.cookies['loggedin']){
        // next();
        res.json({
            message: 'true'
        })
        return true;

    }
    else{
        res.redirect('http://localhost:5173/login');
        res.json({
            message: "please login first!!"
        });
        return false;
    }
};