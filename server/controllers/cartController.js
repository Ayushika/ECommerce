/** @format */

const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const saveCartToDb = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email });

  const cartExistByUser = await Cart.findOne({ orderBy: user._id }).exec();

  if (cartExistByUser) {
    cartExistByUser.remove();
    console.log("Remove old cart");
  }

  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;
    cartTotal += price * cart[i].count;

    products.push(object);
  }

  const newCart = await new Cart({
    products,
    cartTotal,
    orderBy: user._id,
  }).save();

  console.log("New Cart", products);
  res.json({ ok: true });
});

const getUserCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOne({ orderBy: user._id })
    .populate("products.product")
    .exec();
  console.log("get cart: ", cart);
  const { products, totalAfterDiscount, cartTotal } = cart;
  res.json({ products, totalAfterDiscount, cartTotal });
});

const emptyCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec();

  res.json(cart);
});

const saveAddress = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
  ).exec();

  console.log("Email user : ", req.user.email);
  console.log("Address user : ", req.body.address);

  res.json({ ok: true });
});

module.exports = { saveCartToDb, getUserCart, emptyCart, saveAddress };
