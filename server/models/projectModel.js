const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
  },
  description: {
    type: String,
  },
  columns: [
    {
      position: Number,
      name: {
        type: String, 
        unique: [true, "Name of the Kanban column should be unique"]
      },
      tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
      ],
      theme: String,
    },
  ],
  collaborators: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["view", "comment", "edit"],
      },
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
