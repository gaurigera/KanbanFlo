const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  registerUser,
  loginUser,
  } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/currentUser").get(getUserInfo);

module.exports = router;
