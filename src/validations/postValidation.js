import Joi from "joi";

const createPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
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
      page: Joi.number(),
      limit: Joi.number(),
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

const getPostsIndexShow = async (req, res, next) => {
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
      content: Joi.string(),
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
      type: Joi.string().valid('like', 'haha','heart','wow','sad', 'angry').required(),
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
      type: Joi.string().valid('like', 'haha','heart').required(),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getPostById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string()
    })
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const editPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      content: Joi.string().required(),
      authorId: Joi.string().required(),
      deleteFiles: Joi.array().items(Joi.object({
        url: Joi.string().required(),
        public_id: Joi.string().required(),
        type: Joi.string().valid('image', 'video')
      })),
    })
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
const reportPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string().required(),
      type: Joi.string().valid('SPAM', 'INAPPROPRIATE', 'FAKE','ORTHER').required(),
      reason: Joi.string(),
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
  getPostsIndexShow,
  deletePost,
  commentPost,
  getComments,
  getCommentFollowCommentId,
  deleteComment,
  searchPost,
  interactionPost,
  uninteractionPost,
  getPostById,
  editPost,
  reportPost
}