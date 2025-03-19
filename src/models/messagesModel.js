import Joi from "joi";
import { GET_DB } from "../configs/db.js";
import { ObjectId } from "mongodb";

const MESSAGE_COLLECTION = 'messages';
const MESSAGE_SCHEMA = Joi.object({
  roomId: Joi.string().required(),
  sender: Joi.string().required(),
  content: Joi.string().required(),
  images: Joi.array().items(Joi.object({
    url: Joi.string().required(),
    public_id: Joi.string().required()
  })).default([]),
  followMessageId: Joi.string().default(null),
  status: Joi.string().valid('read', 'delete').default('read'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})
const createMessage = async({ roomId, sender, content, followMessageId=null,images}) => {
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
          from: 'users',
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
        $project: {
          'sender._id': 1,
          'sender.name': 1,
          'sender.picture': 1,
          content: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          images: 1,
          'followedMessage._id': 1,
          'followedMessage.content': 1
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
          content: 'This message has been deleted',
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



export const messageModel = {
  MESSAGE_COLLECTION,
  deleteMessage,
  createMessage,
  getAllMessage,
  findMessageById
}