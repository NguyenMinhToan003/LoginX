import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/configs/db';

const POST_COLLECTION = 'posts';
const POST_SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  assets: Joi.array().items(Joi.object({
    public_id: Joi.string().required(),
    url: Joi.string().required()
  })).max(4).min(0).default([]),
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

const findPostsByAuthorId = async (authorId) => {
  try {
    const result = await GET_DB().collection(POST_COLLECTION).find(authorId).toArray()
    return result
  }
  catch (error) {
    throw error
  }
}


export const postModel = {
  POST_COLLECTION,
  createPost,
  findPostsByAuthorId
}