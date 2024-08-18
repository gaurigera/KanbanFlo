const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);
router.route("/:projectId/column/:columnId").patch(addTask).delete(deleteTask);
router.route("/:projectId/column/:columnId/:taskId").delete(deleteTask);

module.exports = router;
