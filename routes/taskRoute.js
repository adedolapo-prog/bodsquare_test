const express = require("express")
const {
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasks/tasksController")
const isAuthenticated = require("../middlewares/is-Auth")
const router = express.Router()

//auth routes
router.post("/", isAuthenticated, createTaskController)
router.put("/:taskId", isAuthenticated, updateTaskController)
router.delete("/:taskId", isAuthenticated, deleteTaskController)

module.exports = router
