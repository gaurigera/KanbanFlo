const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add user full name"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: [true, "The username must be unique"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "This email is already taken"],
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      name: this.name,
      email: this.email,
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
