const mongoose = require("mongoose");
const db_link = "mongodb+srv://aryandelwadia:aryan2004@cluster0.1uxgu17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db_link)
.then(function(db){
    console.log("cartdb connected");
})
.catch(function(err){
    console.log(err);
});

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
    }
});

const cartModel = mongoose.model('cartModel', cartSchema);

module.exports = cartModel;