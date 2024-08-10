const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const createProject = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    await Project.create({ name });
    res.status(200);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

const addCollaborators = expressAsyncHandler(async (req, res) => {
  const { user, role } = req.body;
  const { id } = req.params;

  try {
    await Project.updateOne(
      { _id: id },
      { $push: { collaborators: { user, role } } }
    ).exec();

    res.status(201);
  } catch (error) {
    res.status(404);
  }
});

const removeCollaborators = expressAsyncHandler(async (req, res) => {
  const { user } = req.body;

  try {
    await Project.updateOne(
      { _id: req.params.id },
      { $pull: { collaborators: { user: user } } }
    );

    res.status(201);
  } catch (error) {
    res.status(401);
  }
});

const addColumn = expressAsyncHandler(async (req, res) => {
  const { name, theme } = req.body;

  try {
    await Project.updateOne(
      { _id: req.params.id },
      { $push: { columns: { name, theme } } }
    );

    res.status(201);
  } catch (error) {
    res.status(400);
  }
});

const removeColumn = expressAsyncHandler(async (req, res) => {});

const reorderColumn = expressAsyncHandler(async (req, res) => {});
