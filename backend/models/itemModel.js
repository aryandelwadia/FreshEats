const mongoose = require('mongoose');

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
    },
    img: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Fruits', 'Vegetables', 'Organic', 'Leafy Greens', 'Root Vegetables', 'Other'],
        default: 'Fruits'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;