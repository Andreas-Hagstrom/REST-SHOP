// Defines how orders in the app will be constructed. Used in orders.js
const mongoose = require("mongoose");

// Schema for cart
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Order", orderSchema);
