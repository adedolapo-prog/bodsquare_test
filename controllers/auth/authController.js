const {
  createUserService,
  loginUserService,
} = require("../../services/auth/authService")
const {
  createUserValidation,
} = require("../../validations/authValidator/createUser")

const createUserController = async (req, res) => {
  try {
    createUserValidation(req.body)
    const user = await createUserService(req.body)

    if (user.status !== "Success") {
      throw Error("Unable to register user")
    }

    res.status(201).json({ user })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

const loginUserController = async (req, res) => {
  try {
    createUserValidation(req.body)
    const user = await loginUserService(req.body)

    if (user.status !== "Success") {
      throw Error("Unable to login user")
    }

    res.status(200).json({ user })
  } catch (err) {
    res.status(400).json({ status: "Failed", response: err.message })
  }
}

module.exports = { createUserController, loginUserController }
