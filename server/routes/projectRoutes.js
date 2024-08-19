const express = require("express");
const router = express.Router();

const {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  addColumn,
  addCollaborators,
  removeCollaborators,
  getCollaborators,
} = require("../controllers/projectController");

router.route("/").post(createProject);
router
  .route("/:projectId")
  .get(getProject)
  .delete(deleteProject)
  .put(updateProject);

router.route("/:projectId/column").patch(addColumn);
router
  .route("/:projectId/collab")
  .get(getCollaborators)
  .patch(addCollaborators)
  .delete(removeCollaborators);

module.exports = router;
