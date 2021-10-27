/** @format */

const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await new Category({ name, slug: slugify(name) }).save();
  res.json(category);
});

const getCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const category = await Category.findOne({ slug }).exec();

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error(`Error, while getting ${slug} category`);
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categories);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const category = await Category.findOne({ slug }).exec();

  if (category) {
    await category.remove();
    res.json({ mesaage: `Category ${slug} deleted successfully` });
  } else {
    res.status(404);
    throw new Error(`Error, while deleting ${slug} category`);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const slug = req.params.slug;
  const category = await Category.findOne({ slug }).exec();

  if (category) {
    category.name = name;
    category.slug = slugify(name);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error(`Category ${slug} not found`);
  }
});

module.exports = {
  getCategory,
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
