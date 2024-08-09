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
    status: {
      type: String,
      required: [true, "Please set status"],
      enum: ["todo", "in progress", "under review", "finished"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    deadline: {
      type: Date,
    },
    assignees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["view", "comment", "write"],
        },
      },
    ],
    comments: [
      {
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
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
