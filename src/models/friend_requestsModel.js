import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/configs/db"

const FRIEND_REQUEST_COLLECTION = 'friend_requests'
const FRIEND_REQUEST_SCHEMA = Joi.object({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').default('pending'),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const addFriendRequest = async (senderId, receiverId) => {
  try {
    let data = {
      senderId,
      receiverId,
    }
    data = await FRIEND_REQUEST_SCHEMA.validateAsync(data, { abortEarly: false })
    return await GET_DB().collection(FRIEND_REQUEST_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
  
}

const findFriendRequestById = async (friendRequestId) => {
  try {
    return await GET_DB().collection(FRIEND_REQUEST_COLLECTION).findOne({ _id: new ObjectId(friendRequestId) })
  }
  catch (error) {
    throw error
  }
}

const respondFriendRequest = async (friendRequestId, status) => {
  try {
    return await GET_DB().collection(FRIEND_REQUEST_COLLECTION).updateOne(
      { _id: new ObjectId(friendRequestId) },
      { $set: { status, updatedAt: Date.now() } }
    )
  }
  catch (error) {
    throw error
  }
}

const findFriendRequestBy2User = async (senderId, receiverId) => {
  try {
    const friendRequest = await GET_DB().collection(FRIEND_REQUEST_COLLECTION).findOne({
      senderId,
      receiverId
    })
    return friendRequest
  }
  catch (error) {
    throw error
  }
}

export const friendRequestModel = {
  FRIEND_REQUEST_COLLECTION,
  FRIEND_REQUEST_SCHEMA,
  addFriendRequest,
  findFriendRequestById,
  respondFriendRequest,
  findFriendRequestBy2User
}