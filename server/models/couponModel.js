/** @format */

const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      minLength: [6, "Too short"],
      maxLength: [12, "Too Long"],
      uppercase: true,
      required: "Name is required",
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
