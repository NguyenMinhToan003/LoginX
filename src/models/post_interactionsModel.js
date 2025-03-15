import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/configs/db';

const POSTINTERACTION_COLLECTION = 'post_interactions';
const POSTINTERACTION_SCHEMA = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string().valid('like', 'haha','heart').required(),
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
const getInteractionByPostId = async ({postId, userId=null}) => {
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
          likeUsers: {
            $push: { $cond: [{ $eq: ['$type', 'like'] }, '$userId', ''] }
          },
          hahaUsers: {
            $push: { $cond: [{ $eq: ['$type', 'haha'] }, '$userId', ''] }
          },
          heartUsers: {
            $push: { $cond: [{ $eq: ['$type', 'heart'] }, '$userId', ''] }
          },
         
        },
      },
      {
        $addFields: {
          isLiked: { $in: [userId, '$likeUsers'] },
          isHaha: { $in: [userId, '$hahaUsers'] },
          isHeart: { $in: [userId, '$heartUsers'] },
        }
      },
      {
        $project: {
          _id: 0,
          postId: '$_id',
          likes: 1,
          hahas: 1,
          hearts: 1,
          isLiked: 1,
          isHaha: 1,
          isHeart: 1,
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
  getInteractionByPostId
}