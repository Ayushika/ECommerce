/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} = require("../controllers/brandController");

router.route("/all").get(getAllBrands);
router
  .route("/:slug")
  .get(getBrand)
  .delete(protect, checkAdmin, deleteBrand)
  .put(protect, checkAdmin, updateBrand);
router.route("/").put(protect, checkAdmin, createBrand);

module.exports = router;
