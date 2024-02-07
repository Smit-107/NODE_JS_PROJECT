var mongoose = require('mongoose');

var categoryschema = new mongoose.Schema({
    categoryName:{
        type:String
    },
})

module.exports = mongoose.model("category",categoryschema)