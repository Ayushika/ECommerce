/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} = require("../controllers/couponController");

router.route("/all").get(getAllCoupons);
router.route("/:id").delete(protect, checkAdmin, deleteCoupon);
router.route("/").post(protect, checkAdmin, createCoupon);

module.exports = router;
