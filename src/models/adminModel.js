import Joi from "joi"
import { GET_DB } from "~/configs/db"

const ADMIN_COLLECTION = 'admins'
const ADMIN_SCHEMA = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().default(null),
  address: Joi.string().default(null),
  picture: Joi.object({
    url: Joi.string().default(null),
    public_id: Joi.string().default(null),
    type: Joi.string().default(null),
    name: Joi.string().default(null),
  }),
})

const createAccount = async ({name,email,password,picture}) => {
  try {
    let data = { name, email, password, picture }
    data = await ADMIN_SCHEMA.validateAsync(data, { abortEarly: false })
    return await GET_DB().collection(ADMIN_COLLECTION).insertOne(data)
  } catch (error) {
    throw error
  }
}
const findAdminByQuery = async (query) => {
  try {
    return await GET_DB().collection(ADMIN_COLLECTION).findOne(query)
  } catch (error) {
    throw error
  }
}

const findAllAdmin = async () => {
  try {
    const admins = await GET_DB().collection(ADMIN_COLLECTION).find({}).toArray()
    return admins
  } catch (error) {
    throw error
  }
}

export const adminModel = {
  ADMIN_COLLECTION,
  ADMIN_SCHEMA,
  findAdminByQuery,
  findAllAdmin,
  createAccount
}