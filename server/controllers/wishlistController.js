/** @format */

const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const addToWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: id } },
  ).exec();

  res.json({ ok: true });
});

const deleteItemFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: id } },
  ).exec();

  res.json({ ok: true });
});

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(wishlist);
});

module.exports = { addToWishlist, deleteItemFromWishlist, getWishlist };
