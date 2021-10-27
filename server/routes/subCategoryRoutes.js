/** @format */

const express = require("express");
const Router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {createSubCategory , deleteSubCategory , updateSubCategory , getSubCategory , getAllSubCategories} = require("../controllers/subCategoryController");

Router.route("/all").get(getAllSubCategories);
Router.route("/:slug")
  .get(getSubCategory)
  .delete(protect, checkAdmin, deleteSubCategory)
  .put(protect, checkAdmin, updateSubCategory);
Router.route("/").put(protect, checkAdmin, createSubCategory)


module.exports = Router;
