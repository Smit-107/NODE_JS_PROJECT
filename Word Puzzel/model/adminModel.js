var mongoose = require('mongoose');

var adminregisterschema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    }
})

module.exports = mongoose.model("admin",adminregisterschema)