const express = require("express");
const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");

module.exports.addToCart = async function addToCart(req, res) {
    try {
        let email = req.user.email;
        let data = req.body;
        let item = await cartModel.create({ ...data, email: email });

        res.status(200).json({
            message: "Item Successfully added to cart"
        })
    }
    catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

module.exports.removeFromCart = async function removeFromCart(req, res) {
    try {
        let email = req.user.email;
        let data = req.body;
        let item = await cartModel.deleteOne({ ...data, email: email });

        res.status(200).json({
            message: "Item Successfully deleted from cart"
        })
    }
    catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports.showCart = async function showCart(req, res) {
    try {
        let email = req.user.email;
        let item = await cartModel.find({ email: email });

        res.status(200).json(item);
    }
    catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}