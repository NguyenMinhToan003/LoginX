import Joi from "joi";
import { GET_DB } from "~/configs/db.js";
import { ObjectId } from "mongodb";
import { userModel } from "./userModel.js";
import { postModel } from "./postModel.js";

const MESSAGE_COLLECTION = 'messages';
const MESSAGE_SCHEMA = Joi.object({
  roomId: Joi.string().required(),
  sender: Joi.string().required(),
  content: Joi.string(),
  images: Joi.array().items(Joi.object({
    url: Joi.string().required(),
    public_id: Joi.string().required(),
    type: Joi.string().required(),
    name: Joi.string().default(null),
  })).default([]),
  embedPostId: Joi.string().default(null),
  followMessageId: Joi.string().default(null),
  status: Joi.string().valid('read', 'delete').default('read'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})
const createMessage = async (
  { roomId, sender, content, followMessageId = null, images, embedPostId = null }) => {
  try {
    let data = {
      roomId,
      sender,
      content,
      images,
    }
    data = await MESSAGE_SCHEMA.validateAsync(data, { abortEarly: false })
    if (followMessageId)
      data.followMessageId = new ObjectId(followMessageId)

    if (embedPostId)
      data.embedPostId = new ObjectId(embedPostId)
    return await GET_DB().collection(MESSAGE_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}

const getAllMessage = async (roomId) => {
  try {
    return await GET_DB().collection(MESSAGE_COLLECTION).aggregate([
      { $match: { roomId: roomId } },
      {
        $lookup: {
          from: userModel.USER_COLLECTION,
          localField: 'sender',
          foreignField: '_id',
          as: 'sender'
        }
      },
      { $unwind: '$sender' },
      {
        $lookup: {
          from: MESSAGE_COLLECTION,
          localField: 'followMessageId',
          foreignField: '_id',
          as: 'followedMessage'
        }
      },
      { 
        $unwind: { 
          path: '$followedMessage', 
          preserveNullAndEmptyArrays: true 
        } 
      },
      {
        $lookup: {
          from: postModel.POST_COLLECTION,
          localField: 'embedPostId',
          foreignField: '_id',
          as: 'embedPost'
        }
      },
      { $unwind: { path: '$embedPost', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: userModel.USER_COLLECTION,
          localField: 'embedPost.authorId',
          foreignField: '_id',
          as: 'embedPost.author'
        }
      },
      { $unwind: { path: '$embedPost.author', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          'sender._id': 1,
          'sender.name': 1,
          'sender.picture': 1,
          content: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          images: 1,
          'followedMessage.images': 1,
          'followedMessage._id': 1,
          'followedMessage.content': 1,
          'followedMessage.sender': 1,
          'embedPost._id': 1,
          'embedPost.content': 1,
          'embedPost.assets': 1,
          'embedPost.author._id': 1,
          'embedPost.author.name': 1,
          'embedPost.author.picture': 1,
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}


const deleteMessage = async (messageId) => {
  try {
    const updateMessage = await GET_DB().collection(MESSAGE_COLLECTION).updateOne(
      { _id: new ObjectId(messageId) },
      {
        $set: {
          status: 'delete',
          images: [],
          content: 'This message has been deleted',
          embedPostId: null,
          followMessageId: null,
          updatedAt: Date.now()
        }
      }
    )
    return updateMessage
  }
  catch (error) {
    throw error
  }
}

const findMessageById = async (messageId) => {
  try {
    return await GET_DB().collection(MESSAGE_COLLECTION).findOne({ _id: new ObjectId(messageId) })
  }
  catch (error) {
    throw error
  }
}

const bulkDeleteMessageInRoom = async (roomId) => {
  try {
    const collection = GET_DB().collection(MESSAGE_COLLECTION);
    const result = await collection.deleteMany({ roomId: roomId });
    return result; // Trả về kết quả của deleteMany
  } catch (error) {
    throw error;
  }
};


const getLastMessageInRoom = async (roomId) => {
  try {
    const lastMessage = await GET_DB().collection(MESSAGE_COLLECTION).aggregate([
      { $match: { roomId: roomId } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: userModel.USER_COLLECTION,
          localField: 'sender',
          foreignField: '_id',
          as: 'sender'
        }
      },
      { $unwind: '$sender' },
      {
        $project: {
          'username': '$sender.name',
          'picture': '$sender.picture.url',
          'content': 1,
          'status': 1,
        }
      },
      { $limit: 1 }
    ]).toArray()
    return lastMessage[0]
  }
  catch (error) {
    throw error
  }
}

const getPaginatedMessages = async (roomId, page, limit) => {
  try {
    limit = parseInt(limit) || 30;
    page = parseInt(page) || 1;
    const skip = (page - 1) * limit;
    const data = await GET_DB()
      .collection(MESSAGE_COLLECTION)
      .aggregate([
        { $match: { roomId: roomId } },
        {
          $lookup: {
            from: userModel.USER_COLLECTION,
            localField: 'sender',
            foreignField: '_id',
            as: 'sender',
          },
        },
        { $unwind: '$sender' },
        {
          $lookup: {
            from: MESSAGE_COLLECTION,
            localField: 'followMessageId',
            foreignField: '_id',
            as: 'followedMessage',
          },
        },
        { $unwind: { path: '$followedMessage', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: postModel.POST_COLLECTION,
            localField: 'embedPostId',
            foreignField: '_id',
            as: 'embedPost',
          },
        },
        { $unwind: { path: '$embedPost', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: userModel.USER_COLLECTION,
            localField: 'embedPost.authorId',
            foreignField: '_id',
            as: 'embedPost.author',
          },
        },

        { $unwind: { path: '$embedPost.author', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            'sender._id': 1,
            'sender.name': 1,
            'sender.picture': 1,
            content: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            images: 1,
            'followedMessage.images': 1,
            'followedMessage._id': 1,
            'followedMessage.content': 1,
            'followedMessage.sender': 1,
            'embedPost._id': 1,
            'embedPost.content': 1,
            'embedPost.assets': 1,
            'embedPost.author._id': 1,
            'embedPost.author.name': 1,
            'embedPost.author.picture': 1,
          },
        },
      ])
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalDocs = await GET_DB()
      .collection(MESSAGE_COLLECTION)
      .countDocuments({ roomId: roomId });
    const totalPages = Math.ceil(totalDocs / limit);

    return {
      messages: data,
      page: page,
      limit: limit,
      totalPage: totalPages,
    };
  } catch (error) {
    throw error;
  }
}

const getTotalPageMessagePaginateInRoom = async (roomId,limit) => {
  try {
    limit = parseInt(limit) || 10
    const totalDocs =
      await GET_DB().collection(MESSAGE_COLLECTION).countDocuments({ roomId: roomId })
    const totalPage = Math.ceil(totalDocs / limit)
    return totalPage
  }
  catch (error) {
    throw error
  }
}

export const messageModel = {
  MESSAGE_COLLECTION,
  deleteMessage,
  createMessage,
  getAllMessage,
  findMessageById,
  bulkDeleteMessageInRoom,
  getLastMessageInRoom,
  getPaginatedMessages,
  getTotalPageMessagePaginateInRoom
}