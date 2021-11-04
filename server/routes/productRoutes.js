/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/productController");

router.route("/all/:count").get(getAllProducts);
router.route("/:slug").delete(deleteProduct);
router.route("/").put(protect, checkAdmin, createProduct);


module.exports = router;
