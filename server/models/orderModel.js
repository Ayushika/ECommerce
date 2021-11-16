/** @format */

const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStaus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delievered",
      ],
    },
    orderBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
