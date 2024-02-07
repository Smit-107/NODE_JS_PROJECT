var mongoose = require('mongoose');

var seedschema = new mongoose.Schema({
    seedName:{
        type:String
    },
    seedsQuantity:{
        type:String
    },
    seedsPrice:{
        type:String
    },
    quantityAdd:{
        type:String
    },
    priceAdd:{
        type:String
    }
    
    
})

module.exports = mongoose.model("seed",seedschema)