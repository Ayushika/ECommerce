/** @format */

const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
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
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: "Category is required",
    },
  },
  { timestamps: true },
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
