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
      userId: Joi.string()
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

const deletePost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      authorId: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const commentPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      authorId: Joi.string().required(),
      content: Joi.string().required(),
      followCommentId: Joi.string(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ errorVa: error.message });
  }
}

const getComments = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getCommentFollowCommentId = async (req, res, next) => {
  try {
    const schema = Joi.object({
      commentId: Joi.string().required(),
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const schema = Joi.object({
      commentId: Joi.string().required(),
      authorId: Joi.string().required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const searchPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string(),
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const interactionPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string().required(),
      type: Joi.string().valid('like','share').required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const uninteractionPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string().required(),
      type: Joi.string().valid('like','share').required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export const postValidation = {
  createPost,
  getPostByAuthorId,
  getPostsFriend,
  deletePost,
  commentPost,
  getComments,
  getCommentFollowCommentId,
  deleteComment,
  searchPost,
  interactionPost,
  uninteractionPost
}