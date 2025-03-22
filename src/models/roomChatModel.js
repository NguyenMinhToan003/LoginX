import Joi from 'joi'
import { GET_DB } from '../configs/db.js'
import { ObjectId } from 'mongodb'
import { messageModel } from './messagesModel.js'

const ROOMCHAT_COLLECTION = 'roomchats'
const ROOMCHAT_SCHEMA = Joi.object({
  type: Joi.string().valid('group', 'private').required(),
  info: Joi.object({
    name: Joi.string().optional(),
    avartar: Joi.object({
      url: Joi.string().default(null),
      public_id: Joi.string().default(null),
      type: Joi.string().default(null)
    }),
    admins: Joi.array().items(Joi.string()).optional()
  }),
  members: Joi.array().items(Joi.string()).min(1).required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const createRoom = async (type, name, avartar, admins, members) => {
  try {
    let data = {
      type,
      info: {
        name,
        avartar,
        admins,
      },
      members,
    }
    data = await ROOMCHAT_SCHEMA.validateAsync(data, { abortEarly: false })
    return await GET_DB().collection(ROOMCHAT_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
const findRoomById = async (roomId) => {
  try {
    return await GET_DB().collection(ROOMCHAT_COLLECTION).findOne({ _id: new ObjectId(roomId) })
  }
  catch (error) {
    throw error
  }
}
const joinRoom = async (roomId, members) => {
  try {
    return await GET_DB().collection(ROOMCHAT_COLLECTION).updateOne(
      { _id: new ObjectId(roomId) },
      { $addToSet: { members: { $each: members } } }
    )
  }
  catch (error) {
    throw error
  }
}

const findInfoRoomChatById = async (roomId) => {
  try {
    const rooms = await GET_DB().collection(ROOMCHAT_COLLECTION).aggregate([
      { $match: { _id: new ObjectId(roomId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'info.admins',
          foreignField: '_id',
          as: 'info.admins'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'members'
        }
      }
    ]).toArray()
    return rooms[0]
    
  }
  catch (error) {
    throw error
  }
}
const findRoomChatByUserId = async (userId)=>{
  try {
    const rooms = GET_DB().collection(ROOMCHAT_COLLECTION).find(
      { members: { $in: [userId] } },
    ).toArray()
    return rooms

  }
  catch (error) {
    throw error
  }
}

const findRoomChatByUserIdAndType = async (userId, type) => {
  try {
    const rooms = GET_DB().collection(ROOMCHAT_COLLECTION).find(
      { members: { $in: [userId] }, type: type },
    ).toArray()
    return rooms
  }
  catch (error) {
    throw error
  }
}

const deleteRoom = async (roomId) => {
  try {
    const deleteMessage = await GET_DB().collection(messageModel.MESSAGE_COLLECTION).deleteMany({ roomId: roomId })
    const result = await GET_DB().collection(ROOMCHAT_COLLECTION).deleteOne({ _id: new ObjectId(roomId) })
    return result
  }
  catch (error) {
    throw error
  }
}

const leaveRoom = async (roomId, userId) => {
  try {
    const result = await GET_DB().collection(ROOMCHAT_COLLECTION).updateOne(
      { _id: new ObjectId(roomId) },
      { $pull: { members: userId } }
    )
    return result
  }
  catch (error) {
    throw error
  }
}

const updateInfoRoom = async (type,roomId, name, avartar, admins, membersUpdate) => {
  try {
    let data = {
      type,
      info: {
        name,
        avartar,
        admins,
      },
      members: membersUpdate,
      updatedAt: Date.now()
    }
    data = await ROOMCHAT_SCHEMA.validateAsync(data, { abortEarly: false })
    const result = await GET_DB().collection(ROOMCHAT_COLLECTION).updateOne(
      { _id: new ObjectId(roomId) },
      {
        $set: data
      }
    )
    return result
  }
  catch (error) {
    throw error
  }
}

const findRoomPrivate = async (members) => {
  try {
    return await GET_DB().collection(ROOMCHAT_COLLECTION).findOne({
      type: 'private',
      members: { $all: members }
    })
  }
  catch (error) {
    throw error
  }
}

export const roomChatModel = {
  ROOMCHAT_COLLECTION,
  ROOMCHAT_SCHEMA,
  createRoom,
  findRoomPrivate,
  findRoomById,
  joinRoom,
  deleteRoom,
  findInfoRoomChatById,
  findRoomChatByUserId,
  findRoomChatByUserIdAndType,
  leaveRoom,
  updateInfoRoom
}