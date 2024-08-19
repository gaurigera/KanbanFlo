const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);
module.exports = User;
