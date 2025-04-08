const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: String, required: true },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
