/** @format */

const SubCategory = require("../models/subcategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await new SubCategory({
    name,
    category,
    slug: slugify(name),
  }).save();
  res.json(subCategory);
});

const getAllSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(subCategories);
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const subcategory = await SubCategory.findOne({ slug }).exec();

  if (subcategory) {
    await subcategory.remove();
    res.json({ message: `SubCategory ${slug} deleted successfully` });
  } else {
    res.status(404);
    throw new Error(`Error, while deleting ${slug} SubCategory`);
  }
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { category, name } = req.body;
  const slug = req.params.slug;
  const subCategory = await SubCategory.findOne({ slug }).exec();

  if (subCategory) {
    subCategory.category = category;
    subCategory.slug = slugify(name);
    subCategory.name = name;

    const updatedSubCategory = await subCategory.save();
    res.json(updatedSubCategory);
  } else {
    res.status(404);
    throw new Error(`Error, while updating ${slug} SubCategory`);
  }
});

const getSubCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const subCategory = await SubCategory.findOne({ slug }).exec();
  res.json(subCategory);
});

module.exports = {
  createSubCategory,
  getAllSubCategories,
  deleteSubCategory,
  updateSubCategory,
  getSubCategory,
};
