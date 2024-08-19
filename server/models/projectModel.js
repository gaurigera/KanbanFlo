const mongoose = require("mongoose");

const { ROLES, THEMES } = require("../constants");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
    unique: [true, "Need to have unique project globally"],
    trim: true
  },
  description: {
    type: String,
  },
  columns: [
    {
      position: Number,
      name: {
        type: String,
      },
      tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
      ],
      theme: {
        type: String,
        enum: [THEMES.blue, THEMES.purple, THEMES.yellow],
      },
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
        enum: [ROLES.Admin, ROLES.Comment, ROLES.Edit, ROLES.View],
      },
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
