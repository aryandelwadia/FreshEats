const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validator = require('email-validator');
require("dotenv").config();

const db_link = process.env.DB;

mongoose.connect(db_link)
.then(function(db){
    console.log("userdb connected");
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    number:{
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return validator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
    },
    usertype: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    favitem: {
        type: String,
    },
    freshpoints: {
        type: Number,
        default: 0,
    },
    profilePic: {
        type: String,
        default: "default.png"
    }
});

userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashed =await bcrypt.hash(this.password, salt);
    this.password = hashed;
    this.usertype="Customer";
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;