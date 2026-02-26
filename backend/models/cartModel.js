const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
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
        default: "default.png"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
});

const cartModel = mongoose.model('cartModel', cartSchema);

module.exports = cartModel;