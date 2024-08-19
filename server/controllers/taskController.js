const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

/**
 * @desc Post Task
 * @route POST /api/task
 */
const addTask = expressAsyncHandler(async (req, res) => {
  try {
    const { projectId, columnId } = req.params;
    const { title, description, priority, status } = req.body;

    const project = await Project.findById(projectId);
    const column = project.columns.id(columnId);

    const task = await Task.create({ title, description, priority, status });

    column.tasks.push(task);

    await project.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

/**
 * @desc Get Task
 * @route GET /api/tasks/:id
 */
const getTask = expressAsyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ success: false });
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @desc Update Task
 * @route UPDATE /api/tasks/:id
 */
const updateTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, updatedTask });
});

/**
 * @desc Delete Task
 * @route DELETE /api/Tasks/:id
 */
const deleteTask = expressAsyncHandler(async (req, res) => {
  const { projectId, columnId, taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const project = await Project.findById(projectId);
  const column = project.columns.id(columnId);

  column.tasks.pull(task);

  await project.save();

  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (deletedTask) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = {
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
