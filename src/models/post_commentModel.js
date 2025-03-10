
const POSTCOMMENT_COLLECTION = 'post_comment'
const POSTCOMMENT_SCHEMA = Joi.object({
  postId: Joi.string().required(),
  authorId: Joi.string().required(),
  content: Joi.string().required(),
  folowCommentId: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})
const postCommentModel = {
  POSTCOMMENT_COLLECTION,
  POSTCOMMENT_SCHEMA,
}