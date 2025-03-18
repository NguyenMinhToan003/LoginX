import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/configs/db';

const POSTINTERACTION_COLLECTION = 'post_interactions';
const POSTINTERACTION_SCHEMA = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string().valid('like', 'haha','heart','wow','sad', 'angry').required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const createPostInteraction = async ({ postId, userId, type }) => {
  try {
    let data = { postId, userId, type }
    data = await POSTINTERACTION_SCHEMA.validateAsync(data, { abortEarly: false })
    data.postId = new ObjectId(data.postId)
    return await GET_DB().collection(POSTINTERACTION_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
const updatePostInteraction = async ({_id,type}) => {
  try {

    return await GET_DB().collection(POSTINTERACTION_COLLECTION).updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          type: type,
          updatedAt: Date.now()
        }
      }
    )
    
  }
  catch (error) {
    throw error
  }
}

const deletePostInteraction = async ({ postId, userId, type }) => {
  try {
    return await GET_DB().collection(POSTINTERACTION_COLLECTION).deleteOne({ postId: new ObjectId(postId), userId, type })
  }
  catch (error) {
    throw error
  }
}

const findInteractionByQuery = async (query) => {
  try {
    return await GET_DB().collection(POSTINTERACTION_COLLECTION).aggregate([
      { $match: query },
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}

////! them truong usser de danh dau neu user da like hoac share bai viet
const getInteractionByPostId = async ({postId}) => {
  try {
    const result = await GET_DB().collection(POSTINTERACTION_COLLECTION).aggregate([
      { $match: { postId: new ObjectId(postId) } },
      {
         $group: {
          _id: '$postId',
          likes: {
            $sum: { $cond: [{ $eq: ['$type', 'like'] }, 1, 0] }
          },
          hahas: {
            $sum: { $cond: [{ $eq: ['$type', 'haha'] }, 1, 0] }
          },
          hearts: {
            $sum: { $cond: [{ $eq: ['$type', 'heart'] }, 1, 0] }
          },
          wows: {
            $sum: { $cond: [{ $eq: ['$type', 'wow'] }, 1, 0] }
          },
          sads: {
            $sum: { $cond: [{ $eq: ['$type', 'sad'] }, 1, 0] }
          },
          angrys: {
            $sum: { $cond: [{ $eq: ['$type', 'angry'] }, 1, 0] }
          },
        },
      },
      {
        $project: {
          _id: 0,
          likes: 1,
          hahas: 1,
          hearts: 1,
          wows: 1,
          sads: 1,
          angrys: 1,
        }
      }
    ]).toArray()
    return result[0]
  }
  catch (error) {
    throw error
  }
}

export const postInteractionModel = {
  POSTINTERACTION_COLLECTION,
  findInteractionByQuery,
  createPostInteraction,
  deletePostInteraction,
  getInteractionByPostId,
  updatePostInteraction,
}