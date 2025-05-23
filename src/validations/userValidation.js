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

const searchUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string(),
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getFriendRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteFriendRequest = async (req, res, next) => {
  try {
    const schema = Joi.object({
      friendRequestId: Joi.string().required(),
      userAction: Joi.string().required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const unfriend = async (req, res, next) => {
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
const getFriends = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next() 
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getUserById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const editUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email(),
      phone: Joi.string().min(10).max(11).regex(/^[0-9]+$/),
      address: Joi.string(),
      userName: Joi.string(),
      background: Joi.string(),
      work: Joi.string(),
      link: Joi.array().items(Joi.string()),
      bio: Joi.string(),
      history: Joi.string(),
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
  respondFriendRequest,
  searchUser,
  getFriendRequest,
  deleteFriendRequest,
  unfriend,
  getFriends,
  getUserById,
  editUser
}