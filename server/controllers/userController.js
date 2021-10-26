/** @format */

const userSchema = require("../models/userModel");
const asyncHandler = require("express-async-handler");
//@desc   Register User
//@routes POST /api/register
//@access PRIVATE

const registerUser = async (req, res) => {
  const { email, picture, name } = req.user;

  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      console.log("User Updated");
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: req.user.token,
        isAdmin: user.isAdmin,
      });
    } else {
      const newUser = await new userSchema({
        email,
        name: email.split("@")[0],
        picture,
      }).save();
      console.log("User Created");
      res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: req.user.token,
        isAdmin: newUser.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

//@desc   Check User
//@routes POST /api/isAdmin && api/isValid
//@access PRIVATE

const currentUser = asyncHandler(async (req, res) => {
  const { email } = req.user;
  userSchema.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
});

module.exports = { registerUser, currentUser };
