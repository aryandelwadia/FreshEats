const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const db_link = "mongodb+srv://aryandelwadia:aryan2004@cluster0.1uxgu17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db_link)
.then(function(db){
    console.log('itemsdb connected')
})
.catch(function(err){
    console.log(err)
});

const itemSchema = mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
    itemprice: {
        type: Number,
        required: true,
        min: 1,
    },
    prodplace: {
        type: String,
        required: true
    }
});

const itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;