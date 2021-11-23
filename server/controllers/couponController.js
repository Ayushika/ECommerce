/** @format */

const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body;
  
  const coupon = await new Coupon({ name, expiry, discount }).save();
  res.json(coupon);
});

const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({}).exec();
  res.json(coupons);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete({ _id: id }).exec();
  res.json(coupon);
});

module.exports = { createCoupon, deleteCoupon, getAllCoupons };
