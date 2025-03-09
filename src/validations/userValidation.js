import Joi from "joi"

const addFriendRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
      friendId: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const respondFriendRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      friendRequestId: Joi.string().required(),
      status: Joi.string().required().valid('accepted', 'rejected'),
      userAction: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const userValidation = {
  addFriendRequest,
  respondFriendRequest
}