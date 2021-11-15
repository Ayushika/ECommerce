/** @format */

const express = require("express");
const router = express.Router();
const { registerUser, currentUser } = require("../controllers/userController");
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  saveCartToDb,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToCart,
} = require("../controllers/cartController");

router.route("/cart").post(protect, saveCartToDb).get(protect, getUserCart).delete(protect , emptyCart);
router.route("/register").post(protect, registerUser);
router.route("/isAdmin").post(protect, checkAdmin, currentUser);
router.route("/isValid").post(protect, currentUser);
router.route("/address").post(protect, saveAddress)
router.route("/cart/coupon").post(protect, applyCouponToCart)

module.exports = router;
