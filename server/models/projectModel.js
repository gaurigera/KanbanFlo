const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
  },
  description: {
    type: String,
    required: [true, "Please add short description"],
  },
  columns: [
    {
      name: String,
      tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      }],
      theme: String
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
