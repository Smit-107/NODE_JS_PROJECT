var mongoose = require("mongoose");

var subcategoryschema = new mongoose.Schema({
  subCategory: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  price: {
    type: Number,
  },
  image:{
    type:String
}
});

module.exports = mongoose.model("subCategory", subcategoryschema);
