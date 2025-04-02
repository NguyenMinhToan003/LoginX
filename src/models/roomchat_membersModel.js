import { ObjectId } from 'mongodb'
import { GET_DB } from '~/configs/db'
import { roomChatModel } from './roomChatModel'
const Joi = require('joi')

const ROOMCHATMEMBER_COLECTION = 'roomchat_members'

const ROOMCHATMEMBER_SCHEMA = Joi.object({
  roomId: Joi.string().required(),
  userId: Joi.string().required(),
  role: Joi.string().valid('admin', 'member').default('member'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const createRoomChatMember = async (roomId, userId, role) => {
  try {
    let data = { roomId, userId, role }
    data = await ROOMCHATMEMBER_SCHEMA.validateAsync(data, { abortEarly: false })
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).insertOne(data)
  } catch (error) {
    throw error
  }
}

const bulkInsertRoomChatMembers = async (roomId, members, role) => {
  try {
    const collection = GET_DB().collection(ROOMCHATMEMBER_COLECTION)
    const bulkData = collection.initializeOrderedBulkOp()

    for (const member of members) {
      const validatedData = await ROOMCHATMEMBER_SCHEMA.validateAsync(
        { roomId, userId: member, role},
        { abortEarly: false }
      )
      validatedData.roomId = new ObjectId(validatedData.roomId)

      bulkData.insert(validatedData)
    }

    return await bulkData.execute()
  } catch (error) {
    throw error
  }
}
const findMembersInRoom = async (roomId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).aggregate([
      { $match: { roomId: roomId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$user._id',
          name: '$user.name',
          picture: '$user.picture',
          role: 1,
        }
      }
    ]).toArray()
  } catch (error) {
    throw error
  }
}
const findRoomsPrivateByUserId = async (userId) => {
  try {

    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: roomChatModel.ROOMCHAT_COLLECTION,
          localField: 'roomId',
          foreignField: '_id',
          as: 'room',
        }
      },
      {
        $unwind: '$room'
      },
      {
        $match: { 'room.type': 'private' }
      },
      {
        $project: {
          _id: '$room._id',
          type: '$room.type',
          name: '$room.name',
          avatar: '$room.avatar',
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}
const findMembersInRoomChatId = async (roomId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).aggregate([
      { $match: { roomId: new ObjectId(roomId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$user._id',
          name: '$user.name',
          picture: '$user.picture',
          role: 1,
        }
      }
    ]).toArray()
  }
  catch (error) {
    throw error
  }
}
const findRoomsGroupByUserId = async (userId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: roomChatModel.ROOMCHAT_COLLECTION,
          localField: 'roomId',
          foreignField: '_id',
          as: 'room',
        }
      },
      {
        $unwind: '$room'
      },
      {
        $match: { 'room.type': 'group' }
      },
      {
        $project: {
          _id: '$room._id',
          type: '$room.type',
          name: '$room.name',
          avatar: '$room.avatar',
        }
      }
    ]).toArray()
  } catch (error) {
    throw error
  }
}
const findRoomsChatByUserId = async (userId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: roomChatModel.ROOMCHAT_COLLECTION,
          localField: 'roomId',
          foreignField: '_id',
          as: 'room',
        }
      },
      {
        $unwind: '$room'
      },
      {
        $project: {
          _id: '$room._id',
          type: '$room.type',
          name: '$room.name',
          avatar: '$room.avatar',
        }
      }
    ]).toArray()
  } catch (error) {
    throw error
  }
}
const deleteRoomChatMembersByRoomId = async (roomId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).deleteMany({ roomId: new ObjectId(roomId) })
  }
  catch (error) {
    throw error
  }
}

const memberLeaveRoom = async (roomId, userId) => {
  try {
    return await GET_DB().collection(ROOMCHATMEMBER_COLECTION).deleteOne(
      { roomId: new ObjectId(roomId), userId: userId })
  }
  catch (error) {
    throw error
  }
}

export const roomchatMembersModel = {
  ROOMCHATMEMBER_COLECTION,
  ROOMCHATMEMBER_SCHEMA,
  createRoomChatMember,
  bulkInsertRoomChatMembers,
  findMembersInRoom,
  findRoomsPrivateByUserId,
  findRoomsGroupByUserId,
  findRoomsChatByUserId,
  findMembersInRoomChatId,
  deleteRoomChatMembersByRoomId,
  memberLeaveRoom
}
