//importing routes
const authRoute = require("./authRoute")
const taskRoute = require("./taskRoute")

const routes = (app) => {
  const base = `/api/v1`

  //using routes
  app.use(`${base}/auth`, authRoute)
  app.use(`${base}/tasks`, taskRoute)
}

module.exports = routes
