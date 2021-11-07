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
  getTotalRelatedProductsCount,
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
router.route("/related/:slug").get(getRelatedProducts);
router.route("/totalrelatedproducts/:slug").get(getTotalRelatedProductsCount);

module.exports = router;
