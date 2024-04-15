const express = require('express');
const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const app = express();

const db_link = "mongodb+srv://aryandelwadia:aryan2004@cluster0.1uxgu17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db_link)
.then(function(db){
    console.log('sellerdb connected');
})
.catch(function(err){
    console.log(err);
});

const sellerSchema = mongoose.Schema({
    fname: {
        type: String, 
        required: true,
    },
    lname: {
        type: String, 
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validator: function(){
            return validator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    usertype: {
        type: String,
    },
    storename: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    storenumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    }
});

sellerSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt();
    const hased  = await bcrypt.hash(this.password,salt);
    this.password = hased;
    this.usertype = "Seller";
})

const sellerModel = mongoose.model("sellerModel", sellerSchema);

module.exports = sellerModel;