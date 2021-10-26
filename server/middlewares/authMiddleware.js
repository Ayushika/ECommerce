/** @format */

const userSchema = require("../models/userModel");
const admin = require("../config/firebase");

const protect = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);

    req.user = firebaseUser;
    req.user.token = req.headers.authorization;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token Or Token Expired");
  }
};

const checkAdmin = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await userSchema.findOne({ email }).exec();
  if (adminUser.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as a Admin");
  }
};

module.exports = { protect, checkAdmin };
