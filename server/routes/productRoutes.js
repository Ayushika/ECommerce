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
  productRating,
  getRelatedProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductsByBrand,
} = require("../controllers/productController");

//products - listAll , getSingle , create , update , delete
router.route("/all/:count").get(getAllProducts);
router.route("/total").get(getTotalProductsCount);
router
  .route("/:slug")
  .get(getProduct)
  .delete(protect, checkAdmin, deleteProduct)
  .put(protect, checkAdmin, updateProduct);
router.route("/").put(protect, checkAdmin, createProduct);

//rating
router.route("/star/:slug").put(protect, productRating);

//home
router.route("/home").post(getProducts);

//related
router.route("/related/:slug").post(getRelatedProducts);

//get Products by Category
router.route("/category/:slug").post(getProductsByCategory);

//get Products by SubCategory
router.route("/subcategory/:slug").post(getProductsBySubcategory);

//get Products by Brand
router.route("/brand/:slug").post(getProductsByBrand);

module.exports = router;
