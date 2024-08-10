const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const payload = {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @desc Post user
 * @route GET /api/user/register
 */
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass);

  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  if (user) {
    const payload = {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    res.status(201).json({
      _id: user.id,
      email: user.email,
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Already registered!");
  }

  res.json({ message: "Register User" });
});

module.exports = { getUserInfo, loginUser, registerUser };
