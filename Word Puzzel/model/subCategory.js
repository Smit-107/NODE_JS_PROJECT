var mongoose = require('mongoose');

var subcategory = new mongoose.Schema({
    subcategoryName:{
        type:String
    },
    puzzleString:{
        type:String
    },
    puzzleImage:{
        type:String
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    winId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})

module.exports = mongoose.model('subcategory',subcategory)