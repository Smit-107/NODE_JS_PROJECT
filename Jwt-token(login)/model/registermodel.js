var mongoose = require('mongoose');

var registerschema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("register",registerschema)