import Joi from "joi"
import { GET_DB } from "~/configs/db"

const { ObjectId } = require("mongodb")

const POSTCOMMENT_COLLECTION = 'post_comments'
const POSTCOMMENT_SCHEMA = Joi.object({
  postId: Joi.string().required(),
  authorId: Joi.string().required(),
  content: Joi.string().required(),
  followCommentId: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const createComment = async ({postId, authorId, content, followCommentId}) => {
  try {
    let data = { postId, authorId, content }
    if (followCommentId!== null) data.followCommentId = followCommentId

    data = await POSTCOMMENT_SCHEMA.validateAsync(data, { abortEarly: false })
    data.postId = new ObjectId(data.postId)
    if (data.followCommentId) data.followCommentId = new ObjectId(data.followCommentId)
    const result = await GET_DB().collection(POSTCOMMENT_COLLECTION).insertOne(data) 
    return result
  }
  catch (error) {
    throw error
  }
}

const findCommentsByPostId = async (postId) => {
  try {
    const result = await GET_DB().collection(POSTCOMMENT_COLLECTION).aggregate([
      { $match: { postId: new ObjectId(postId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          content: 1,
          'author._id': 1,
          'author.name': 1,
          'author.picture': 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray()
    return result
  }
  catch (error) {
    throw error
  }
}

const findCommentFollowCommentId = async (followCommentId) => {
  try {
    const result = await GET_DB().collection(POSTCOMMENT_COLLECTION).aggregate([
      { $match: { followCommentId: new ObjectId(followCommentId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $project: {
          content: 1,
          'author._id': 1,
          'author.name': 1,
          'author.picture': 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray()
    return result
  }
  catch (error) {
    throw error
  }
}

const findCommentById = async (commentId) => {
  try {
    const result = await GET_DB().collection(POSTCOMMENT_COLLECTION).findOne({ _id: new ObjectId(commentId) })
    return result
  }
  catch (error) {
    throw error
  }
}

const deleteComment = async (commentId) => {
  try {
    await GET_DB().collection(POSTCOMMENT_COLLECTION).deleteMany({ followCommentId: new ObjectId(commentId) })
    const result = await GET_DB().collection(POSTCOMMENT_COLLECTION).deleteOne({ _id: new ObjectId(commentId) })
    return result
  }
  catch (error) {
    throw error
  }
}

export const postCommentModel = {
  POSTCOMMENT_COLLECTION,
  POSTCOMMENT_SCHEMA,
  createComment,
  findCommentsByPostId,
  findCommentFollowCommentId,
  findCommentById,
  deleteComment
}