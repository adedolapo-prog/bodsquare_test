const jwt = require("jsonwebtoken")
const argon2 = require("argon2")

const tokenHandler = async (email, _id) => {
  try {
    const token = jwt.sign({ email, _id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
    return token
  } catch (error) {
    throw new Error("Unable to generate token.")
  }
}

const AlphaNumeric = (length, type = "alpha") => {
  var result = ""
  var characters =
    type === "alpha"
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      : "0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const hashPassword = async (password) => {
  return await argon2.hash(password)
}

const verifyPassword = async (password, dbpassword) => {
  return await argon2.verify(dbpassword, password)
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error("Unable to verify token.")
  }
}

module.exports = {
  tokenHandler,
  AlphaNumeric,
  hashPassword,
  verifyPassword,
  verifyToken,
}
