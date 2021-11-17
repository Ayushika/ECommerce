/** @format */

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    // cart:{
    //     type:Array,
    //     default:[]
    // },
    address: {
      type: String,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
