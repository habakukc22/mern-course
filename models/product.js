const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Product", productSchema);
//name of the schema is "Product" and that will be the name of the collection too
