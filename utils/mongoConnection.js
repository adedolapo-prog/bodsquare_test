const mongoose = require("mongoose")
const { consumeFromQueue } = require("../modules/queue/taskConsumer")

const connection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const conn = mongoose.connection.on("connected", () => {
    console.log("Database Connected")
    consumeFromQueue()
  })

  return { conn }
}

module.exports = { connection }
