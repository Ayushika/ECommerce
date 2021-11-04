/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await new Product(req.body).save();
  res.json(newProduct);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const count = req.params.count;
  const products = await Product.find({})
    .limit(parseInt(count))
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .sort({ createdAt: -1 })
    .exec();

  res.json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOneAndDelete({ slug }).exec();
  if (product) {
    res.json(product);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug }).exec();
  res.json(product);
});

module.exports = { createProduct, getAllProducts, deleteProduct, getProduct };
