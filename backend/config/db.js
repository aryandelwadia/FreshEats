const mongoose = require('mongoose');

const db_link = 'mongodb+srv://aryandelwadia:aryan2004@cluster0.1uxgu17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbconnect = ()=>{
    
    mongoose.connect(db_link)
    .then(function(db){
        console.log("db connected");
    })
    .catch(function(err){
        console.log(err);
    })
} 

module.exports = dbconnect;