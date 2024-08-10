const mongoose = require("mongoose");

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
      enum: ["low", "medium", "high"],
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
          default: Date.now
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
