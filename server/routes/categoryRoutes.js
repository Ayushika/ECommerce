/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  createCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.route("/all").get(getAllCategories);
router
  .route("/:slug")
  .get(getCategory)
  .delete(protect, checkAdmin, deleteCategory)
  .put(protect, checkAdmin, updateCategory);

router.route("/").post(protect, checkAdmin, createCategory);

module.exports = router;
