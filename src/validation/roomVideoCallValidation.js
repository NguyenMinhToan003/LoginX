import Joi from "joi"

const roomVideoCallController = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getRoomToken = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const roomVideoCallValidation = {
  getRoomToken,
  roomVideoCallController,
}