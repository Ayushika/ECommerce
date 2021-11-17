/** @format */

const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const uniqid = require("uniqid");

const createOrder = asyncHandler(async (req, res) => {
  const { paymentIntent } = req.body;

  //find user
  const user = await User.findOne({ email: req.user.email }).exec();

  //find products from cart using user id
  const { products } = await Cart.findOne({ orderBy: user._id }).exec();

  //create new order
  const newOrder = await new Order({
    products,
    paymentIntent,
    orderBy: user._id,
  }).save();

  //decreement available quantity and increemnet sold quantity
  const bulkOption = products.map((p) => {
    return {
      updateOne: {
        filter: { _id: p.product._id },
        update: { $inc: { quantity: -p.count, sold: +p.count } },
      },
    };
  });

  const updatedProduct = await Product.bulkWrite(bulkOption, { new: true });

  console.log("Product Updated", updatedProduct);
  res.json({ ok: true });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const orders = await Order.find({ orderBy: user._id })
    .populate("products.product")
    .exec();
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("products.product").exec();
  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, orderStaus } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { orderStaus },
    { new: true },
  );

  res.json({ ok: true });
});

//createCashOrder
const createCashOrder = asyncHandler(async (req, res) => {
  const { cashOrder, couponApplied } = req.body;

  console.log("coupon : ", couponApplied);
  if (cashOrder === false) {
    res.status(404).json("Error while making payment");
  }

  //find user
  const user = await User.findOne({ email: req.user.email }).exec();

  //find products from cart using user id
  const { products, cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderBy: user._id,
  }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  console.log("Total ", totalAfterDiscount);
  console.log("Final ", finalAmount);
  //create new order
  const newOrder = await new Order({
    products,
    paymentIntent: {
      id: uniqid(),
      amount: finalAmount,
      currency: "inr",
      created: Date.now(),
      payment_method_types: ["cash"],
      status: "Not Processed",
    },
    orderBy: user._id,
  }).save();

  //decreement available quantity and increemnet sold quantity
  const bulkOption = products.map((p) => {
    return {
      updateOne: {
        filter: { _id: p.product._id },
        update: { $inc: { quantity: -p.count, sold: +p.count } },
      },
    };
  });

  const updatedProduct = await Product.bulkWrite(bulkOption, { new: true });

  // console.log("Product Updated", updatedProduct);
  res.json({ ok: true });
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrders,
  createCashOrder,
};
