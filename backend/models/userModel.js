const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validator = require('email-validator');

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return validator.validate(this.email);
        }
    },
    password: {
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
    addresses: [{
        label: { type: String, default: "Home" },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        phone: { type: String, required: true }
    }],
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

userSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    this.usertype = "Customer";
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;