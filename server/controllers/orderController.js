/** @format */

const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

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

module.exports = { createOrder, getAllOrders };
