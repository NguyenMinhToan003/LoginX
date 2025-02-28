// import Joi from "joi"

import Joi from "joi"

// const createRoom = async (req, res, next) => {
//   try {
//     next()
//   }
//   catch (error) {
//     return res.status(400).json({ message: error.message })
//   }
// }
const getUserToken = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoomToken = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
export const roomVideoCallValidation = {
  // createRoom'
  getUserToken,
  getRoomToken
}