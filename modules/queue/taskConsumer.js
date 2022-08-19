const amqp = require("amqplib/callback_api")
const config = require("../config")
const { Task } = require("../../models/tasks/taskModel")
const mongoose = require("mongoose")

const consumeFromQueue = async () => {
  amqp.connect(config.rabbit.connectionString, function (error, connection) {
    if (error) {
      throw error
    }
    connection.createChannel(function (err, channel) {
      if (err) {
        throw err
      }
      const queue = "task"

      channel.assertQueue(queue, {
        durable: false,
      })

      channel.consume(
        queue,
        async function (msg) {
          const task = JSON.parse(msg.content)
          const { userId } = task
          const newTask = new Task({
            ...task,
            userId: mongoose.Types.ObjectId(userId),
          })
          await newTask.save()
        },
        {
          noAck: true,
        }
      )
    })
  })
}

module.exports = {
  consumeFromQueue,
}
