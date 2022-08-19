const { publishToQueue } = require("../../modules/queue/taskProducer")
const {
  createTaskValidation,
} = require("../../validations/taskValidator/createTaskValidation")

const createTaskController = async (req, res) => {
  try {
    createTaskValidation(req.body)
    const body = { ...req.body, userId: req.payload._id }
    publishToQueue("task", JSON.stringify(body))
    res.status(201).json({ success: true, response: "Task is being created" })
  } catch (err) {
    res.status(400).json({ success: false, response: err.message })
  }
}

module.exports = {
  createTaskController,
}
