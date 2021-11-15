/** @format */

const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/stripeController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/create-payment-intent").post(protect, createPaymentIntent);

module.exports = router;
