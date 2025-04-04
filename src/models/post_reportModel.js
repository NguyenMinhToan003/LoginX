import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/configs/db'

const POST_REPORT_COLLECTION = 'post_reports'
const POST_REPORT_SCHEMA = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().default(null),
  type: Joi.string().valid('SPAM', 'INAPPROPRIATE', 'FAKE','ORTHER').required(),
  reason: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})
const createPostBlock = async (postId, userId, type, reason) => {
  try {
    let data = { postId, userId, type, reason }
    data = await POST_REPORT_SCHEMA.validateAsync(data, { abortEarly: false })

    data.postId = new ObjectId(postId)
    return await GET_DB().collection(POST_REPORT_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
const findReportByPostId = async (postId) => {
  try {
    return await GET_DB().collection(POST_REPORT_COLLECTION).aggregate([
      { $match: { postId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          postId: 1,
          userId: 1,
          type: 1,
          reason: 1,
          'userName': '$user.name',
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}

const getReportPosts = async (page, limit) => {
  try {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10
    const skip = (page - 1) * limit
    const data= await GET_DB().collection(POST_REPORT_COLLECTION).aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'post'
        }
      },
      { $unwind: '$post' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          postId: 1,
          postContent: '$post.content',
          postAssets: '$post.assets',
          postAuthorId: '$post.authorId',
          type: 1,
          reason: 1,
          userReportId: '$user._id',
          userReportName: '$user.name',
        }
      },
      { $sort: { createdAt: -1 } },
    ]).skip(skip).limit(limit).toArray()
    const totalPage =
      await GET_DB().collection(POST_REPORT_COLLECTION).countDocuments() / limit
    return {
      data,
      page: page,
      limit: limit,
      totalPage: Math.ceil(totalPage),
      totalReportPosts: await GET_DB().collection(POST_REPORT_COLLECTION).countDocuments()
    }
  }
  catch (error) {
    throw error
  }
}


export const postReportModel = {
  POST_REPORT_COLLECTION,
  POST_REPORT_SCHEMA,
  createPostBlock,
  findReportByPostId,
  getReportPosts
}
