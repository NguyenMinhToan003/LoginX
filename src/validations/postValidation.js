import Joi from "joi";

const createPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      authorId: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getPostByAuthorId = async (req, res, next) => {
  try {
    const schema = Joi.object({
      authorId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getPostsFriend = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export const postValidation = {
  createPost,
  getPostByAuthorId,
  getPostsFriend
}