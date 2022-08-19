const express = require("express")
const {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasks/tasksController")
const isAuthenticated = require("../middlewares/is-Auth")
const router = express.Router()

//auth routes
router.post("/", isAuthenticated, createTaskController)
router.get("/", isAuthenticated, getTaskController)
router.put("/:taskId", isAuthenticated, updateTaskController)
router.delete("/:taskId", isAuthenticated, deleteTaskController)

module.exports = router
