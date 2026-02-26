const express = require('express');
const cors = require('cors');
const itemModel = require('../models/itemModel');
const logger = require('../config/logger');
require('dotenv').config();

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports.additem = async function additem(req, res) {
    try {
        const data = req.body;
        logger.info(`Adding item to shop: ${data.itemname} | price: ${data.itemprice} | seller: ${req.user.email}`);
        let item = await itemModel.create(data);
        logger.info(`Item added to shop successfully: ${data.itemname}`);
        res.status(200).json({
            message: 'Item added to Shop'
        });
    }
    catch (err) {
        logger.error(`Add item error: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getitem = async function getitem(req, res) {
    try {
        logger.info('Fetching all items from shop');
        let data = await itemModel.find({});
        logger.info(`Fetched ${data.length} items from shop`);
        res.json(data);

    }
    catch (err) {
        logger.error(`Get items error: ${err.message}`);
        res.status(500).json({
            message: err.message
        });
    }
}