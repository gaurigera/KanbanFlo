const mongoose = require("mongoose");

const { PRIORITY } = require("../constants");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: [PRIORITY.Low, PRIORITY.Medium, PRIORITY.High],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    comments: [
      {
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
