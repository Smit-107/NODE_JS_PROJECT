var mongoose = require('mongoose');

var categoryschema = new mongoose.Schema({
    category:{
        type:String
    },
    categoryImage:{
        type:String
    }
})

module.exports = mongoose.model('category',categoryschema)