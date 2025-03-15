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

const findFriendRequestByReceiverIdAndSender = async (userId) => {
  try {
    const friendRequests = await GET_DB().collection(FRIEND_REQUEST_COLLECTION).aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiverId',
          foreignField: '_id',
          as: 'receiver'
        }
      },
      {
        $project: {
          senderId: 1,
          receiverId: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          sender: {
            _id: 1,
            name: 1,
            email: 1,
            avatar: 1
          },
          receiver: {
            _id: 1,
            name: 1,
            email: 1,
            avatar: 1
          }
        }
      }
    ]).toArray()
    return friendRequests
  }
  catch (error) {
    throw error
  }
}

const deleteFriendRequest = async (friendRequestId) => {
  try {
    return await GET_DB().collection(FRIEND_REQUEST_COLLECTION).deleteOne({ _id: new ObjectId(friendRequestId) })
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
  findFriendRequestBy2User,
  findFriendRequestByReceiverIdAndSender,
  deleteFriendRequest,

}