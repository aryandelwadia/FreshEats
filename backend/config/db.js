const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('./logger');

const db_link = process.env.DB;

const dbconnect = () => {
    logger.info('Attempting to connect to MongoDB...');
    mongoose.connect(db_link)
        .then(function (db) {
            logger.info('MongoDB connected successfully');
        })
        .catch(function (err) {
            logger.error('MongoDB connection failed', err);
        })
}

module.exports = dbconnect;