const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sellerModel = require("../models/sellerModel");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const seller_jwt_key = "dsn7dh87h1208e7dg0yds6g1dwg1078ge21e";

module.exports.sellerLogin = async function sellerLogin(req,res){
    try{
        const data = req.body;
        let seller = sellerModel.findOne({email: data.email});
        if(seller){
            const isValid = await bcrypt.compareSync(data.password, seller.password);
            if(isValid){
                let uid = seller["_id"];
                let token = jwt.sign({payload: uid}, seller_jwt_key);
                res.cookie("sellerLogin", token, {sameSite: "None", secure: true}).status(200).json({
                    message: "seller logged in"
                });
            }
            else{
                res.status(401).json({
                    message: "wrong credentials"
                });
            }
        }
        else{
            res.status(404).json({
                message: "seller not found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.sellerSignup = async function sellerSignup(req,res){
    try{
        let data = req.body;
        let seller = await sellerModel.create(data);
        res.status(200).json({
            message: "seller account created"
        });
    }
    catch(err){
        res.status(500).json({
            message: "Server Error!"
        })
    }
}

module.exports.sellerLogout = async function(res,req){
    try{
        res.cookie("sellerLogin", "", {maxAge: 1, withCredentials: true});
        res.status(200).json({
            message: "seller logged out successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message: "Server Error!"
        })
    }
}