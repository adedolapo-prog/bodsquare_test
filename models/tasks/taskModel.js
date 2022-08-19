const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const tasks = mongoose.model("Tasks", taskSchema, "tasks")
module.exports = { Task: tasks }
