const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

/**
 * @route /post/
 */
const createProject = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    await Project.create({ name });
    res.status(200);
  } catch (error) {
    res.status(404).json({ message: error });
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
 * @route /add/
 */
const addColumn = expressAsyncHandler(async (req, res) => {
  const { position, name, theme } = req.body;

  try {
    await Project.updateOne(
      { _id: req.params.id },
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
      { $pull: { columns: { columns: req.params.columnId } } }
    ).exec();

    res.status(201).json({
      success: true,
    });
  } catch (error) {}
});

const reorderColumn = expressAsyncHandler(async (req, res) => {});
