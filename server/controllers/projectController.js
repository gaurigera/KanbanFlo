const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

/**
 * @route /post/
 */
const createProject = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    await Project.create({ name });
    res.status(200).json({ message: "Done" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

const getProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
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
    await Project.updateOne(
      { _id: projectId },
      { $push: { collaborators: { user, role } } }
    ).exec();

    res.status(201);
  } catch (error) {
    res.status(404);
  }
});

/**
 * @route /delete/:projectId/:userId
 *  */
const removeCollaborators = expressAsyncHandler(async (req, res) => {
  try {
    const project = { _id: req.params.projectId };
    const collaborator = req.params.userId;

    await Project.updateOne(project, {
      $pull: { collaborators: collaborator },
    }).exec();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(401).json({
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
};
