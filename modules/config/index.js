const config = {
  port: process.env.APP_PORT,
  rabbit: {
    connectionString: `amqp://localhost`,
  },
}

module.exports = config
