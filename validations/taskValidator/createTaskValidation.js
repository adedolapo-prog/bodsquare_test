const joi = require("joi")

const createTaskValidation = (requestData) => {
  const schema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
  })

  const isValidateResult = schema.validate(requestData)
  if (isValidateResult?.error) {
    throw new Error(`${isValidateResult.error?.message}//400`)
  } else {
    return { success: true }
  }
}

module.exports = { createTaskValidation }
