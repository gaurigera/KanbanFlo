const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const { THEMES } = require("../constants");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const getProjects = expressAsyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ projects: projects });
});

/**
 * @route /post/
 */
const createProject = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const project = await Project();

    project.name = name;
    project.columns = [
      { position: 1, name: "To Do", tasks: [], theme: THEMES.blue },
      { position: 2, name: "In-Progress", tasks: [], theme: THEMES.yellow },
      { position: 3, name: "Done", tasks: [], theme: THEMES.purple },
    ];

    await project.save();
    res.status(200).json({ success: true, message: "Done" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

const getProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("columns.tasks");
    res.status(200).json({ project: project });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

const updateProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (name) {
      project.name = name;
    }
    if (description) {
      project.description = description;
    }

    await project.save();
    res.status(201).json({ message: "Update done Successfully!" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

/**
 * @route /delete/:projectId/
 **/
const deleteProject = expressAsyncHandler(async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.projectId });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

/**
 * @route /post/add/:projectId/
 **/
const addCollaborators = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { user, role } = req.body;

  try {
    const isUser = await User.findOne({ _id: user._id });
    const project = await Project.findOne({ _id: projectId });

    if (!isUser || !project) {
      res
        .status(404)
        .json({ success: false, message: "Unable to proceed the request" });
    }

    const collaboratorExists = project.collaborators.some(
      (collaborator) => collaborator.user.toString() === user._id.toString()
    );

    if (!collaboratorExists) {
      await Project.updateOne(
        { _id: projectId },
        { $push: { collaborators: { user, role } } }
      ).exec();

      res.status(201).json({ success: true });
    } else {
      res.sendStatus(304);
    }
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

/**
 * @route /get/:projectId/collab
 */
const getCollaborators = expressAsyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const ans = await Project.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(projectId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "collaborators.user",
          foreignField: "_id",
          as: "collaborators.user",
        },
      },
    ]);

    res
      .status(201)
      .json({ success: true, collaborators: ans[0].collaborators });
  } catch (error) {
    res.status(404).json({
      error: "Unable to get collaborators.",
    });
  }
});

/**
 * @route /delete/:projectId/collab
 *  */
const removeCollaborators = expressAsyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const { user } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the collaborator index
    const collaboratorIndex = project.collaborators.findIndex((collaborator) =>
      collaborator.user.equals(user._id)
    );

    if (collaboratorIndex === -1) {
      return res.status(404).json({ message: "Collaborator not found" });
    }

    // Remove the collaborator from the array
    project.collaborators.splice(collaboratorIndex, 1);

    await project.save();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

/**
 * @route /:projectId/column
 */
const addColumn = expressAsyncHandler(async (req, res) => {
  const { position, name, theme } = req.body;

  if (!name || !theme) {
    res.status(401).json({ success: false, message: "Need all fields!" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      "columns.name": name,
    });

    if (project) {
      return res.status(400).json({
        success: false,
        message: "A column with this name already exists.",
      });
    }

    await Project.updateOne(
      { _id: req.params.projectId },
      { $push: { columns: { position, name, theme, tasks: [] } } }
    ).exec();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400);
  }
});

/**
 * @route /:projectId/:columnId
 */
const removeColumn = expressAsyncHandler(async (req, res) => {
  try {
    await Project.updateOne(
      { _id: req.params.projectId },
      { $pull: { columns: { _id: req.params.columnId } } }
    ).exec();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

const reorderColumn = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  addColumn,
  removeColumn,
  addCollaborators,
  removeCollaborators,
  getCollaborators,
  getProjects
};
