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
    }
});

const itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;