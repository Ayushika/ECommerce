/** @format */

const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const brand = await new Brand({
    name,
    category,
    slug: slugify(name),
  }).save();
  res.json(brand);
});

const getBrand = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const brand = await Brand.findOne({ slug }).exec();
  res.json(brand);
});

const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).sort({ createdAt: -1 }).exec();
  res.json(brands);
});

const deleteBrand = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const brand = await Brand.findOne({ slug }).exec();

  if (brand) {
    await brand.remove();
    res.json({ message: `Brand ${slug} deleted successfully` });
  } else {
    res.status(404);
    throw new Error(`Error, while deleting ${slug} brand`);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { category, name } = req.body;
  const slug = req.params.slug;
  const brand = await Brand.findOne({ slug }).exec();

  if (brand) {
    brand.category = category;
    brand.slug = slugify(name);
    brand.name = name;

    const updatedbrand = await brand.save();
    res.json(updatedbrand);
  } else {
    res.status(404);
    throw new Error(`Error, while updating ${slug} brand`);
  }
});

module.exports = {
  getBrand,
  createBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
};
