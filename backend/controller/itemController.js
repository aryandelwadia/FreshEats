const express = require('express');
const cors = require('cors');
const itemModel = require('../models/itemModel');

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports.additem = async function additem(req,res){
    try{
        const data = req.body;
        let item = await itemModel.create(data);
        res.status(200).json({
            message: 'Item added to Shop'
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getitem = async function getitem(req,res){
    try{
        let data = await itemModel.find({});
        res.json(data);
        
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}