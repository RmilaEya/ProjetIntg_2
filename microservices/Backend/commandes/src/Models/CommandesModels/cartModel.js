const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      cartItemId: { type: mongoose.Schema.Types.ObjectId, ref: "CartItem" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  status: { type: String, default: "open" }, 
});

module.exports = mongoose.model("Cart", cartSchema);



