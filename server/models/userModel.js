const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add user full name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "This email is already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User
