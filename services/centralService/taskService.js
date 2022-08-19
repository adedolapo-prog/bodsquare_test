const { default: mongoose } = require("mongoose")
const { Task } = require("../../models/tasks/taskModel")

const updateTaskService = async ({ body, param }) => {
  const task = await Task.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(param) },
    { $set: { ...body } },
    { returnDocument: true, rawResult: true }
  )

  if (!task || !task?.lastErrorObject.updatedExisting) {
    throw Error("Task not found")
  }
  return { success: true, response: "Task successfully updated" }
}

const deleteTaskService = async ({ param }) => {
  const task = await Task.deleteOne({ _id: mongoose.Types.ObjectId(param) })
  if (task.deletedCount === 0) {
    throw Error("Task not found")
  }

  return { success: true, response: "Task successfully deleted" }
}

module.exports = {
  updateTaskService,
  deleteTaskService,
}
