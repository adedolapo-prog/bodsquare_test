const { publishToQueue } = require("../../modules/queue/taskProducer")
const {
  updateTaskService,
  getTaskService,
  deleteTaskService,
} = require("../../services/centralService/taskService")
const {
  createTaskValidation,
} = require("../../validations/taskValidator/createTaskValidation")

const createTaskController = async (req, res) => {
  try {
    createTaskValidation(req.body)
    const body = { ...req.body, userId: req.payload._id }
    publishToQueue("task", JSON.stringify(body))
    res
      .status(201)
      .json({ status: "Pending", response: "Your task is being created" })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

const getTaskController = async (req, res) => {
  try {
    const tasks = await getTaskService({
      userId: req.payload._id,
    })

    if (tasks.status !== "Success") {
      throw Error("Unable to fetch tasks")
    }

    res.status(200).json({ tasks })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

const updateTaskController = async (req, res) => {
  try {
    const task = await updateTaskService({
      body: req.body,
      param: req.params.taskId,
    })

    if (task.status !== "Success") {
      throw Error("Unable to update task")
    }

    res.status(200).json({ task })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

const deleteTaskController = async (req, res) => {
  try {
    const task = await deleteTaskService({
      param: req.params.taskId,
    })

    if (task.status !== "Success") {
      throw Error("Unable to delete task")
    }

    res.status(200).json({ task })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

module.exports = {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
}
