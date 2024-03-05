const express = require('express');
const app = express();
const userModel = require('../models/userModel');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


module.exports.loginUser = async function loginUser(req, res){
    const data = req.body;
    res.json(data);
};