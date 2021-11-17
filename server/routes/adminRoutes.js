/** @format */

const express = require("express");
const router = express.Router();

const { checkAdmin, protect } = require("../middlewares/authMiddleware");
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.route("/all").get(protect, checkAdmin, getOrders);
router.route("/updateStatus").post(protect, checkAdmin, updateOrderStatus);

module.exports = router;
