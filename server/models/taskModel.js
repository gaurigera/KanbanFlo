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
      required: [true, "Please set priority of the task"]
    },
    status: {
      type: String,
      required: [true, "Status is required for a task"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
