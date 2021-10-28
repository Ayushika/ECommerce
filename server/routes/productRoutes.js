/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const { createProduct } = require("../controllers/productController");

router.route("/").put(protect, checkAdmin, createProduct);

module.exports = router;
