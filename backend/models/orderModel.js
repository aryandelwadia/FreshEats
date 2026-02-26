const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    items: [{
        itemname: { type: String, required: true },
        itemprice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        prodplace: { type: String },
        img: { type: String }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true,
        default: 1.99
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    },
    deliveryAddress: {
        label: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        phone: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderModel = mongoose.model('orderModel', orderSchema);

module.exports = orderModel;
