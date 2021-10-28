/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await new Product(req.body).save();
  res.json(newProduct);
});

module.exports = { createProduct };
