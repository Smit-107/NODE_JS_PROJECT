var mongoose = require('mongoose');

var registerschema = new mongoose.Schema({
    task:{
        type:String
    },
    area:{
        type:String
    },
    status:{
        type:String
    }
})

module.exports = mongoose.model("Task",registerschema)