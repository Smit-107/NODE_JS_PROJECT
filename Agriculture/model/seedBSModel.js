var mongoose = require('mongoose');

var seedBSschema = new mongoose.Schema({
    
    buyerQuantity:{
        type:String
    },
    sellerQuantity:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    seedsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "seed"
    },
    applicationId:{
        type:String
    }
    
})

module.exports = mongoose.model("seedBS",seedBSschema)