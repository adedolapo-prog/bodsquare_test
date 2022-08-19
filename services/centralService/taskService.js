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
  return { status: "Success", response: "Task successfully updated" }
}

const getTaskService = async ({ userId }) => {
  const tasks = await Task.find({ userId: mongoose.Types.ObjectId(userId) })

  if (tasks.length === 0) {
    throw Error("Task not found")
  }

  return {
    status: "Success",
    response: "Your tasks have been successfully fetched",
    data: tasks,
  }
}

const deleteTaskService = async ({ param }) => {
  const task = await Task.deleteOne({ _id: mongoose.Types.ObjectId(param) })
  if (task.deletedCount === 0) {
    throw Error("Task not found")
  }

  return { status: "Success", response: "Task successfully deleted" }
}

module.exports = {
  updateTaskService,
  getTaskService,
  deleteTaskService,
}
