import Joi from "joi"
import { GET_DB } from "~/configs/db"

const FRIEND_COLLECTION = 'friends'
const friendSchema = Joi.object({
  userId: Joi.string().required(),
  friendId: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const addFriend = async (userId, friendId) => {
  try {
    let data = await friendSchema.validateAsync({ userId, friendId }, { abortEarly: false })
    const result = await GET_DB().collection(FRIEND_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}

const unfriend = async (userId, friendId) => {
  try {
    const result = await GET_DB().collection(FRIEND_COLLECTION).deleteOne({
      userId,
      friendId
    })
    return result
  }
  catch (error) {
    throw error
  }
}

const findFriendBy2User = async (userId, friendId) => {
  try {
    const friend = await GET_DB().collection(FRIEND_COLLECTION).findOne({
      userId,
      friendId
    })
    return friend
  }
  catch (error) {
    throw error
  }
}

const findFriendsByUserId = async (userId) => {
  try {
    const friends = await GET_DB().collection(FRIEND_COLLECTION).aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'friendId',
          foreignField: '_id',
          as: 'friend'
        }
      },
      { $unwind: '$friend' },
      {
        $project: {
          
          _id: 0,
          'friend._id': 1,
          'friend.name': 1,
          'friend.picture': 1
        }
      },

      {
        $group: {
          _id: '$friend._id',
          name: { $first: '$friend.name' },
          picture: { $first: '$friend.picture' }
        }
      }
    ]).toArray()
    console.log(friends)
    return friends
  }
  catch (error) {
    throw error
  }
}

export const friendModel = {
  FRIEND_COLLECTION,
  addFriend,
  unfriend,
  findFriendBy2User,
  findFriendsByUserId
}