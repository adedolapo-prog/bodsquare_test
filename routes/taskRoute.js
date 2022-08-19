const express = require("express")
const { createTaskController } = require("../controllers/tasks/tasksController")
const isAuthenticated = require("../middlewares/is-Auth")
const router = express.Router()

//auth routes
router.post("/", isAuthenticated, createTaskController)

module.exports = router
