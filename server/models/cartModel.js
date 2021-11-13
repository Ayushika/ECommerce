/** @format */

const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
