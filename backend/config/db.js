const mongoose = require('mongoose');
require('dotenv').config();

const db_link = process.env.DB;

const dbconnect = () => {
    mongoose.connect(db_link)
        .then(function (db) {
            console.log("db connected");
        })
        .catch(function (err) {
            console.log(err);
        })
}

module.exports = dbconnect;