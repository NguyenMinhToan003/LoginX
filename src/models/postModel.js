import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/configs/db';
import { userModel } from './userModel';
import { postBlockModel } from './post_reportModel';

const POST_COLLECTION = 'posts';
const POST_SCHEMA = Joi.object({
  content: Joi.string().required(),
  assets: Joi.array().items(Joi.object({
    public_id: Joi.string().required(),
    url: Joi.string().required(),
    type: Joi.string().valid('image', 'video'),
    name: Joi.string(),
  })).max(10).min(0).default([]),
  embedId: Joi.string().default(null),
  isBlock: Joi.boolean().default(false),
  authorId: Joi.string().required(),
  createdAt: Joi.date().default(Date.now()),
  updatedAt: Joi.date().default(null),
})

const createPost = async (data) => {
  try {
    data = await POST_SCHEMA.validateAsync(data, { abortEarly: false })
    const result = await GET_DB().collection(POST_COLLECTION).insertOne(data)
    return result
  }
  catch (error) {
    throw error
  }
}

const findPostsByAuthorId = async (query, page, limit) => {
  try {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10
    const skip = (page - 1) * limit
    const result = await GET_DB().collection(POST_COLLECTION).aggregate([
      { $match: query },
      {
        $lookup: {
          from: userModel.USER_COLLECTION,
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $project: {
          content: 1,
          content: 1,
          assets: 1,
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

const findPostById = async (postId) => {
  try {
    const result = await GET_DB().collection(POST_COLLECTION).findOne({ _id:new ObjectId(postId) })
    return result
  }
  catch (error) {
    throw error
  }
}
const deletePost = async (postId) => {
  try {
    const result = await GET_DB().collection(POST_COLLECTION).deleteOne({ _id:new ObjectId(postId) })
    return result
  }
  catch (error) {
    throw error
  }
}

const findPostByQuery = async ({ content }) => {
  try {
    const posts = await GET_DB().collection(POST_COLLECTION).aggregate([
      { $match: { content: { $regex: content, $options: 'i' } } },
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
          content: 1,
          assets: 1,
          'author._id': 1,
          'author.name': 1,
          'author.picture': 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray()
    return posts 
  }
  catch (error) {
    throw error
  }
}

const updatePost = async (postId, data) => {
  try {
    data = await POST_SCHEMA.validateAsync(data, { abortEarly: false })
    const result = await GET_DB().collection(POST_COLLECTION).updateOne({ _id: new ObjectId(postId) }, { $set: data })
    return result
  }
  catch (error) {
    throw error
  }
}
  

export const postModel = {
  POST_COLLECTION,
  createPost,
  findPostsByAuthorId,
  findPostById,
  deletePost,
  findPostByQuery,
  updatePost
}