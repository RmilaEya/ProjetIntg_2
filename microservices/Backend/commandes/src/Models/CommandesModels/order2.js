const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String },
  productPrice: { type: Number },
  quantity: { type: Number, required: true },
  total: { type: Number }
});

module.exports = mongoose.model("Order2", orderSchema);
