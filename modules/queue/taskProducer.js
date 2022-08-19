const amqp = require("amqplib")
const config = require("../config")

const publishToQueue = async (queue, message) => {
  try {
    const cluster = await amqp.connect(config.rabbit.connectionString)
    const channel = await cluster.createChannel()
    await channel.assertQueue(queue, {
      durable: false,
    })
    channel.sendToQueue(queue, Buffer.from(message))
  } catch (error) {
    // handle error response
    console.error(error, "Unable to connect to cluster!")
    process.exit(1)
  }
}
module.exports = {
  publishToQueue,
}
