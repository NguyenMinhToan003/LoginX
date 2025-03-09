import Joi from "joi"

const createRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      type:Joi.string().required(),
      name:Joi.string().required(),
      avartar:Joi.string(),
      admins:Joi.array().items(Joi.string()).required().min(1),
      members:Joi.array().items(Joi.string()).required().min(1),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const joinRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId:Joi.string().required(),
      members: Joi.array().items(Joi.string()).required().min(1),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId:Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoomChatByUserId = async (req, res, next) => {
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
const deleteRoom = async (req, res, next) => {
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

const leaveRoom = async (req, res, next) => {
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

const updateInfoRoom = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().required(),
      name: Joi.string().required(),
      avartar: Joi.string().required(),
      admins: Joi.array().items(Joi.string()).min(1).required(),
      userAction: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const roomChatValidation = {
  createRoom,
  joinRoom,
  getRoom,
  deleteRoom,
  getRoomChatByUserId,
  leaveRoom,
  updateInfoRoom
}