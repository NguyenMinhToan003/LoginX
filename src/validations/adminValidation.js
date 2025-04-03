import Joi from "joi"

const setStatusAccount = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userAction: Joi.string().required(),
      userId: Joi.string().required(),
      statusAccount: Joi.string().valid('DEFAULT', 'BLOCK').required()
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const createAccountAdmin = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getReportPosts = async (req, res, next) => {
  try {
    const schema = Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false })
    next()
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const adminValidation = {
  setStatusAccount,
  createAccountAdmin,
  login,
  getReportPosts
}