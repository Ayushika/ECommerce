/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  getProducts,
  getTotalProductsCount,
  updateProduct,
} = require("../controllers/productController");

router.route("/all/:count").get(getAllProducts);
router.route("/total").get(getTotalProductsCount);
router
  .route("/:slug")
  .get(getProduct)
  .delete(protect, checkAdmin, deleteProduct).put(protect,checkAdmin , updateProduct);

router.route("/").put(protect, checkAdmin, createProduct);
router.route("/home").post(getProducts);

module.exports = router;
