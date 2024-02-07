var mongoose = require('mongoose');

var registerschema = new mongoose.Schema({

    email:{
        type:String
    },
    password:{
        type:String
    },
    userName:{
        type:String
    }
})

module.exports = mongoose.model("Login",registerschema);
