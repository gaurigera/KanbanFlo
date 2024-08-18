const express = require("express");
const router = express.Router();

const {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  addColumn,
} = require("../controllers/projectController");

router.route("/").post(createProject);
router
  .route("/:projectId")
  .get(getProject)
  .delete(deleteProject)
  .put(updateProject);

router.route("/:projectId/column").patch(addColumn);

module.exports = router;
