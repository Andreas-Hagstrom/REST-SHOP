// Defines how products are constructed
const mongoose = require("mongoose");

// Schema for products

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, // Assures just lettes are passed in
  price: { type: Number, required: true }, // Assures just numbers are passed in
  productImage: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
