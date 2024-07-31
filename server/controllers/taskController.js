const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

/**
 * @desc Get all Tasks
 * @route GET /api/Tasks
 */
const getTasks = expressAsyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

/**
 * @desc Post Task
 * @route POST /api/tasks
 */
const createTask = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, description, status, priority, deadline } = req.body;
  if (!title || !description || !status) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      deadline,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(404);
  }
});

/**
 * @desc Get Task
 * @route GET /api/tasks/:id
 */
const getTask = expressAsyncHandler(async (req, res) => {
  const Task = await Task.findById(req.params.id);
  if (!Task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json(Task);
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

  res.status(200).json(updatedTask);
});

/**
 * @desc Delete Task
 * @route DELETE /api/Tasks/:id
 */
const deleteTask = expressAsyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  if (deletedTask) {
    // Check if deletion was successful 
    res.status(200).json(deletedTask);
  } else {
    // Handle unexpected deletion failure
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
