import Joi from "joi"
import { GET_DB } from "../configs/db.js"

const USER_COLLECTION = 'users'
export const userSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  picture: Joi.string().required(),
  typeAccount: Joi.string().required().valid('local', 'twitter','github'),
  password: Joi.string().when('typeAccount', {
    is: 'local',
    then: Joi.string().required()
  }).when('typeAccount', {
    is: Joi.string().valid('twitter', 'github'),
    then: Joi.string().optional().allow(null)
  }),
  friends: Joi.array().items(Joi.string()).default([]),
  posts: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})

const findUserById = async (id) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION).findOne({ _id: id })
    return user
  } catch (error) {
    throw error
  }
}

const createUser = async (user) => {
  try {
    user = await userSchema.validateAsync(user, { abortEarly: false })
    const newUser = await GET_DB().collection(USER_COLLECTION).insertOne(user)
    return newUser
  } catch (error) {
    throw error
  }
}
const findAllUser = async () => {
  try {
    const users = await GET_DB().collection(USER_COLLECTION).find({}).toArray()
    return users
  } catch (error) {
    throw error
  }
}
const addFriend = async (userId, friendId) => {
  try {
    await GET_DB().collection(USER_COLLECTION).updateOne(
      { _id: userId },
      { $addToSet: { friends: friendId } }
    )
    await GET_DB().collection(USER_COLLECTION).updateOne(
      { _id: friendId },
      { $addToSet: { friends: userId } }
    )
  }
  catch (error) {
    throw error
  }
}


export const userModel = {
  USER_COLLECTION,
  findUserById,
  createUser,
  findAllUser,
  addFriend
}