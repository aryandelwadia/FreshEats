const express = require('express');
const app = express();
const mongoose = require('mongoose');
var validator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = 'mongodb+srv://aryandelwadia:aryan2004@cluster0.1uxgu17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(db_link)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // validate: function(){
        //     return validator.validate(email);
        // }
    },
    password:{
        type: String,
        required: true,
    }
});

userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashed =await bcrypt.hash(this.password, salt);
    this.password = hashed;
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;