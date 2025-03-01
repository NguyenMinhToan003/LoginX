import Joi from "joi"
import { GET_DB } from "../configs/db.js"
import { ObjectId } from "mongodb"

const ROOMCHAT_COLLECTION = 'roomchats'
const ROOMCHAT_SCHEMA = Joi.object({
  type: Joi.string().valid('group', 'private').required(),
  info: Joi.object({
    name: Joi.string().required(),
    avartar: Joi.string(),
    admins: Joi.array().items(Joi.string()).required().min(1),
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
    return await GET_DB().collection(ROOMCHAT_COLLECTION).aggregate([
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
  }
  catch (error) {
    throw error
  }
}
const findRoomChatByUserId = async (userId)=>{
  try {
    const rooms = GET_DB().collection(ROOMCHAT_COLLECTION).find(
      { members: { $in: [userId] } },
      {
        $sort: { createdAt: 1 }
      }
    ).toArray()
    return rooms

  }
  catch (error) {
    throw error
  }
}
export const roomChatModel = {
  ROOMCHAT_COLLECTION,
  ROOMCHAT_SCHEMA,
  createRoom,
  findRoomById,
  joinRoom,
  findInfoRoomChatById,
  findRoomChatByUserId
}