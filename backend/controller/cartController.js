const express = require("express");
const app = express();
const cors = require("cors");
const cartModel = require("../models/cartModel");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

app.use(cors);
app.use(cookieParser);

const jwt_key = process.env.JWT_KEY;

module.exports.addToCart = async function addToCart(req, res){
    try{
        let token = req.cookies.loggedin;
        let payload = jwt.verify(token, jwt_key);
        if(payload){
            let uid = payload.payload;
            const user = await userModel.findById(uid);
            let email = user.email;

            let data = req.body;
            let em = {email: email};
            let item = await cartModel.create({...data, ...em});

            res.status(200).json({
                message: "Item Successfully added to cart"
            })
        }
        else{
            res.status(401).json({
                message: "Unauthorised Access"
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message,
        })
    }
}

module.exports.removeFromCart = async function removeFromCart(req, res){
    try{
        let token = req.cookies.loggedin;
        let payload = jwt.verify(token, jwt_key);
        if(payload){
            let uid = payload.payload;
            const user = await userModel.findById(uid);
            let email = user.email;

            let data = req.body;
            let em = {email: email};
            let item = await cartModel.deleteOne({...data, ...em});

            res.status(200).json({
                message: "Item Successfully deleted from cart"
            })
        }
        else{
            res.status(401).json({
                message: "Unauthorised Access"
            })
        }
    }
    catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports.showCart = async function showCart(req, res){
    try{
        let token = req.cookies.loggedin;
        let payload = jwt.verify(token, jwt_key);
        if(payload){
            let uid = payload.payload;
            const user = await userModel.findById(uid);
            let email = user.email;

            let item = await cartModel.find({email: email});

            res.status(200).json(item);
        }
        else{
            res.status(401).json({
                message: "Unauthorised Access"
            })
        } 
    }
    catch(err){
        res.status(404).json({
            message: err.message,
        })
    }
}