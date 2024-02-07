var mongoose = require('mongoose');

var registerschema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
    ,
    loggedIn: {
        type: Boolean,
        default: false,
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model("register",registerschema)