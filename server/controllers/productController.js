/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subcategoryModel");
const Brand = require("../models/brandModel");

const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await new Product(req.body).save();
  res.json(newProduct);
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
    .populate("ratings.postedBy")
    .exec();
  res.json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const { sort, order, page } = req.body;

  let currentPage = Number(page) || 1;
  const limit = 3;

  const total = await Product.find({}).countDocuments();
  currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

  const products = await Product.find({})
    .skip((currentPage - 1) * limit)
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .populate("ratings.postedBy")
    .sort([[sort, order]])
    .limit(Number(limit))
    .exec();

  res.json({ total, products });
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
  const { page } = req.body;

  let currentPage = Number(page) || 1;
  const limit = 3;

  const product = await Product.findOne({ slug: req.params.slug }).exec();

  const total = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  }).countDocuments();

  currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .populate("ratings.postedBy")
    .skip((currentPage - 1) * limit)
    .limit(Number(limit))
    .exec();

  res.json({ total, relatedProducts });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { page } = req.body;

  let currentPage = Number(page) || 1;
  const limit = 3;

  const category = await Category.findOne({ slug: req.params.slug }).exec();

  const total = await Product.find({
    category: category._id,
  }).countDocuments({});

  currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

  const products = await Product.find({
    category: category._id,
  })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .populate("ratings.postedBy")
    .skip((currentPage - 1) * limit)
    .limit(Number(limit))
    .exec();

  res.json({ total, products });
});

const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const { page } = req.body;

  let currentPage = Number(page) || 1;
  const limit = 3;

  const subcategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();

  const total = await Product.find({
    subcategories: subcategory._id,
  }).countDocuments();

  currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

  const products = await Product.find({
    subcategories: subcategory._id,
  })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .populate("ratings.postedBy")
    .skip((currentPage - 1) * limit)
    .limit(Number(limit))
    .exec();

  res.json({ total, products });
});

const getProductsByBrand = asyncHandler(async (req, res) => {
  const { page } = req.body;

  let currentPage = Number(page) || 1;
  const limit = 3;

  const brand = await Brand.findOne({
    slug: req.params.slug,
  }).exec();

  const total = await Product.find({
    brand: brand._id,
  }).countDocuments();

  currentPage = (currentPage - 1) * 3 >= total ? 1 : page;

  const products = await Product.find({
    brand: brand._id,
  })
    .populate("category")
    .populate("subcategories")
    .populate("brand")
    .populate("ratings.postedBy")
    .skip((currentPage - 1) * limit)
    .limit(Number(limit))
    .exec();

  res.json({ total, products });
});

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  productRating,
  getRelatedProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductsByBrand,
};
