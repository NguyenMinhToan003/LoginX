
const Joi = require("joi");

const rexgexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().regex(rexgexEmail),
      password: Joi.string().min(6).required(),
      name: Joi.string().required()
    })
    await schema.validateAsync(req.body,{abortEarly:false});
    next();}
  catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
const login  = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().regex(rexgexEmail),
      password: Joi.string().min(6).required()
    })
    await schema.validateAsync(req.body,{abortEarly:false});
    next();}
  catch (error) {
    return res.status(400).json({ message: error.message });
  }
}



export const authValidation = {
  register,
  login
}