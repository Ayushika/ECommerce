/** @format */

const express = require("express");
const router = express.Router();
const { registerUser, currentUser } = require("../controllers/userController");
const { protect, checkAdmin } = require("../middlewares/authMiddleware");

router.route("/register").post(protect, registerUser);
router.route("/isAdmin").post(protect, checkAdmin, currentUser);
router.route("/isValid").post(protect, currentUser);

module.exports = router;
