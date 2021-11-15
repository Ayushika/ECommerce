/** @format */

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Product = require("../models/productModel");
const stripe = require("stripe")(
  "sk_test_51Jw3H8SJnWSxlCWBTfKNvXc8G98Ik4gqZIx4BbTEEcMhyvseaBVbRqeKtJD983gwhmFe7FZHKKNZ0D1VxCSYZKWM00DWf4NvXC",
);

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  //get user
  const user = await User.findOne({ email: req.user.email }).exec();
  //get cartTotal
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderBy: user._id,
  }).exec();

  //discount applied ?
  const finalAmount =
    coupon && totalAfterDiscount ? totalAfterDiscount : cartTotal;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "INR",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
});

module.exports = { createPaymentIntent };
