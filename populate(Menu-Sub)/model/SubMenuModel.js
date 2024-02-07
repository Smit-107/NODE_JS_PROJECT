var mongoose = require('mongoose');

var submenuschema = new mongoose.Schema({
    submenu:{
        type:String
    },
    menu_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    }
})

module.exports = mongoose.model('submenu',submenuschema)