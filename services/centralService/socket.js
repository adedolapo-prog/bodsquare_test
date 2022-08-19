const { default: mongoose } = require("mongoose")
const { Sockets } = require("../../models/socket/socketModel")

const addUser = async ({ socketId, userId }) => {
  try {
    const existingUser = await Sockets.exists({ userId })

    if (existingUser) {
      await Sockets.deleteMany({ userId: mongoose.Types.ObjectId(userId) })
    }
    const user = new Sockets({ socketId, userId })
    await user.save()
    return { success: true, data: user }
  } catch (err) {
    return { success: false, data: err }
  }
}

const removeUser = async (socketId) => {
  try {
    const { userId } = await Sockets.findOne({ socketId })
    await Sockets.deleteMany({
      userId: mongoose.Types.ObjectId(userId),
    })
    return { success: true, data: "user disconnected" }
  } catch (err) {
    return { success: false, data: err }
  }
}

const getUser = async (userId) => {
  return await Sockets.findOne({ userId })
}

module.exports = { addUser, removeUser, getUser }
