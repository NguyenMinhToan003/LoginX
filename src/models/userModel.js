import Joi from "joi"
import { GET_DB } from "~/configs/db.js"

const USER_COLLECTION = 'users'
export const userSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  picture: Joi.object({
    url: Joi.string().default(null),
    public_id: Joi.string().default(null),
    type: Joi.string().default(null),
    name: Joi.string().default(null),
  }),
  statusAccount: Joi.string().default('default').valid('DEFAULT','BLOCK'),
  typeAccount: Joi.string().required().valid('local', 'twitter','github','google','zalo'),
  password: Joi.string().default(null),
  email: Joi.string().email().default(null),
  phone: Joi.string().default(null),
  address: Joi.string().default(null),
  userName: Joi.string().default(null),
  background: Joi.string().default(null),
  link: Joi.array().items(Joi.string()).default([]),
  bio: Joi.string().default(null),
  history: Joi.string().default(null),
  idSocial: Joi.string().default(null),
  timeLogin: Joi.date().timestamp().default(Date.now()),
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
    const users = await GET_DB().collection(USER_COLLECTION).aggregate([
      { $match: {} },
      { $project: { password: 0 } },
      { $sort: { createdAt: -1 } }
    ]).toArray()
    return users
  } catch (error) {
    throw error
  }
}


const findUserByQuery = async (query) => {
  try {
    const users = await GET_DB().collection(USER_COLLECTION).aggregate([
      { $match: query },
      { $project: { password: 0 } }
    ]).toArray()
    return users
  }
  catch (error) {
    throw error
  }
}
const editUser = async (id, data) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION).updateOne({ _id: id },
      { $set: data })
    return result
  }
  catch (error) {
    throw error
  }
}

const findUserByIdSocial = async (idSocial,type) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION).findOne({
      idSocial: idSocial,
      typeAccount: type
    })
    return user
  }
  catch (error) {
    throw error
  }
}

const findUserByEmail = async (email) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION).findOne({
      email
    })
    return user
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
  findUserByQuery,
  editUser,
  findUserByIdSocial,
  findUserByEmail,
}