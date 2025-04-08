const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  carts: [
    {
      cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }, 
          },
  ],
});

module.exports = mongoose.model("Order", orderSchema); 
