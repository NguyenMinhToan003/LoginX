import Joi from 'joi'
import { GET_DB } from '../configs/db.js'
import { ObjectId } from 'mongodb'

const ROOMCHAT_COLLECTION = 'roomchats'
const ROOMCHATA_SCHEMA = Joi.object({
  type: Joi.string().valid('group', 'private').required(),
  name: Joi.string().optional(),
  avatar: Joi.object({
    url: Joi.string().default(null),
    public_id: Joi.string().default(null),
    type: Joi.string().default(null),
    name: Joi.string().default(null),
  }),
  detail: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const createRoom = async (type, name, avatar) => {
  try {
    
    if (avatar === null) {
      avatar = {
        url: 'empty',
        public_id: 'empty',
        type: 'empty',
      }
    }
    let data = { type, name, avatar }
    data = await ROOMCHATA_SCHEMA.validateAsync(data, { abortEarly: false })
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


const deleteRoom = async (roomId) => {
  try {
    return await GET_DB().collection(ROOMCHAT_COLLECTION).deleteOne({ _id: new ObjectId(roomId) })
  }
  catch (error) {
    throw error
  }
}

const leaveRoom = async (roomId, userId) => {
}

const updateInfoRoom = async (roomId, name, avatar) => {
  try {
    return await GET_DB().collection(ROOMCHAT_COLLECTION).updateOne(
      { _id: new ObjectId(roomId) },
      {
        $set: {
          name,
          avatar,
          updatedAt: Date.now(),
        },
      }
    )
  }
  catch (error) {
    throw error
  }
}



export const roomChatModel = {
  ROOMCHAT_COLLECTION,
  ROOMCHATA_SCHEMA,
  createRoom,
  findRoomById,
  deleteRoom,
  leaveRoom,
  updateInfoRoom,
}