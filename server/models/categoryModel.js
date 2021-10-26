/** @format */

const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      minLength: [2, "Too short"],
      maxLength: [32, "Too long"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
