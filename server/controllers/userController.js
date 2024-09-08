const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { REFRESH_TOKEN_COOKIE } = require("../constants");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("");
  }
};

const refreshAccessToken = expressAsyncHandler(async (req, res) => {
  
});

/**
 * @desc Get user info
 * @route GET /api/user/currentUser
 */
const getUserInfo = expressAsyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

/**
 * @desc Post user
 * @route GET /api/user/login
 */
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("Required fields are empty");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const tokens = await generateAccessAndRefereshTokens(user._id);

    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken);
    res.status(200).json({ success: true, token: tokens.accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/**
 * @desc Post user
 * @route GET /api/user/register
 */
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ username });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass);

  const user = await User.create({
    name,
    email,
    username,
    password: hashedPass,
  });

  if (user) {
    const tokens = await generateAccessAndRefereshTokens(user._id);

    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken);
    res.status(200).json({ success: true, token: tokens.accessToken });

    res.status(201).json({
      success: true,
      token: tokens.accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Already registered!");
  }

  res.json({ message: "Register User" });
});

module.exports = { getUserInfo, loginUser, registerUser };
