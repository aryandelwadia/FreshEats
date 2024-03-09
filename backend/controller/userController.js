const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const { default: toast } = require('react-hot-toast');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


module.exports.loginUser = async function loginUser(req, res){
    const data = req.body;
    try{
        let 
    }
    catch(err){
        res.json({
            message: err.message,
        })
    }
};

module.exports.signupUser = async function signupUser(req, res){
    const data = req.body;
    try{
        let user = await userModel.create(data);
        res.json({
            message: 'user signed up'
        });
        
    }
    catch(err){
        
        res.json({
            message: err.message,
        })
    }
}