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
const { createOrder, getAllOrders } = require("../controllers/orderController");

router
  .route("/cart")
  .post(protect, saveCartToDb)
  .get(protect, getUserCart)
  .delete(protect, emptyCart);
router.route("/register").post(protect, registerUser);

//cart
router.route("/isAdmin").post(protect, checkAdmin, currentUser);
router.route("/isValid").post(protect, currentUser);
router.route("/address").post(protect, saveAddress);

//coupon
router.route("/cart/coupon").post(protect, applyCouponToCart);

//order
router.route("/order").post(protect, createOrder);
router.route("/orders").get(protect, getAllOrders);

module.exports = router;
