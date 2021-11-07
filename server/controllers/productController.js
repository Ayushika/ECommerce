/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");

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
  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .exec();
  res.json(product);
});

const getTotalProductsCount = asyncHandler(async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount();
  res.json(total);
});

const getProducts = asyncHandler(async (req, res) => {
  const { sort, order, page } = req.body;

  const currentPage = Number(page) || 1;
  const limit = 3;

  const products = await Product.find({})
    .skip((currentPage - 1) * limit)
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .sort([[sort, order]])
    .limit(Number(limit))
    .exec();

  res.json(products);
});

const updateProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true },
  ).exec();
  res.json(updatedProduct);
});

const productRating = asyncHandler(async (req, res) => {
  const { star } = req.body;

  console.log("Star : ", star, "Slug : ", req.params.slug);
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const existingRating = await product.ratings.find(
    (e) => e.postedBy.toString() === user._id.toString(),
  );

  if (existingRating === undefined) {
    const ratingCreated = await Product.findByIdAndUpdate(
      product._id,
      { $push: { ratings: { star, postedBy: user._id } } },
      { new: true },
    ).exec();

    res.json(ratingCreated);
  } else {
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRating } },
      { $set: { "ratings.$.star": star } },
      { new: true },
    ).exec();

    res.json(ratingUpdated);
  }
});

const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .exec();

  res.json(relatedProducts);
});

const getTotalRelatedProductsCount = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  const total = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  }).estimatedDocumentCount();
  res.json(total);
});

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  getProducts,
  getTotalProductsCount,
  updateProduct,
  productRating,
  getRelatedProducts,
  getTotalRelatedProductsCount,
};
