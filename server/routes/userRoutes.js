const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../controllers/userController");
const { AuthVerify } = require("../middlewares/authVerify");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(AuthVerify, getUserInfo);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(logoutUser)

module.exports = router;
