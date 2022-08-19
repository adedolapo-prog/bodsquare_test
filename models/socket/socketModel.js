const mongoose = require("mongoose")

const socketSchema = new mongoose.Schema(
  {
    socketId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
)

const Sockets = mongoose.model("Sockets", socketSchema, "Sockets")
module.exports = { Sockets }
