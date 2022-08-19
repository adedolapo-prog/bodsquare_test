const {
  addUser,
  getUser,
  removeUser,
} = require("../../services/centralService/socket")
const fs = require("fs")
const { Task } = require("../../models/tasks/taskModel")

module.exports.socketConnection = async (io) => {
  io.on("connection", async (socket) => {
    socket.on("join", async (obj) => {
      const { success, data } = await addUser({
        socketId: socket.id,
        userId: obj.userId,
      })
      if (!success) {
        socket.emit("join", `Error: ${data.message}`)
      } else {
        socket.emit("join", "Connection Successful")
      }
    })

    socket.on("disconnect", async () => {
      await removeUser(socket.id)
    })

    socket.on("error", (error) => {
      fs.writeFileSync("errorlog.txt", `Error: ${error.message} /n`)
    })
  })

  const changeStream = Task.watch()
  changeStream.on("change", async (change) => {
    try {
      if (change.operationType === "insert") {
        const receiver = await getUser(change.fullDocument.userId)

        io.to(receiver.socketId).emit("in-app-notification", {
          status: "Success",
          response: "Your task has been created",
        })
      }
    } catch (error) {
      fs.writeFileSync("errorlog.txt", `Error: ${error.message} /n`)
    }
  })
}
