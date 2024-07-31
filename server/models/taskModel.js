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
      enum: ["low", "medium", "high"]
    },
    deadline: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task