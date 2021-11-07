/** @format */

const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [32, "Too Long"],
      minLength: [2, "Too Short"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      text: true,
      maxLength: 2000,
      required: true,
    },
    price: {
      type: Number,
      maxLength: 32,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: [
        "Black",
        "Brown",
        "White",
        "Red",
        "Orange",
        "Yellow",
        "Grey",
        "Blue",
        "Silver",
      ],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
