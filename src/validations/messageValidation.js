import Joi from "joi"

const createMessage = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().required(),
      sender: Joi.string().required(),
      content: Joi.string(),
      followMessageId: Joi.string(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getAllMessage = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().required(),
      userId: Joi.string().required(),

    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const deleteMessage = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
      messageId: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const repMessage = async (req, res, next) => {
  try {
    const schema = Joi.object({
      messageId: Joi.string().required(),
      authorId: Joi.string().required(),
      content: Joi.string().required(),
      followMessageId: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const messageValidation = {
  createMessage,
  getAllMessage,
  deleteMessage,
  repMessage
}