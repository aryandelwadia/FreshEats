const express = require('express');
const app = express();
const mongoose = require('mongoose');

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
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;