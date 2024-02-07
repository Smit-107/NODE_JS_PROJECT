var mongoose = require('mongoose');

var menuschema = new mongoose.Schema({
    menu:{
        type:String
    }
})

module.exports = mongoose.model('menu',menuschema)