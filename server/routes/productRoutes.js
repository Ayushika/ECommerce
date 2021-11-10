/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
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
} = require("../controllers/productController");

const {
  getProductsBySearchFilter,
} = require("../controllers/searchController");

//products - listAll , getSingle , create , update , delete
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

//get products by search/filter
router.route("/search/filter").post(getProductsBySearchFilter);

module.exports = router;
