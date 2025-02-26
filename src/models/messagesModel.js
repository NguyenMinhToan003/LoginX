import Joi from "joi";
import { GET_DB } from "../configs/db.js";

const MESSAGE_COLLECTION = 'messages';
const MESSAGE_SCHEMA = Joi.object({
  roomId: Joi.string().required(),
  sender: Joi.string().required(),
  content: Joi.string().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
})
const createMessage = async (roomId, sender, content) => {
  try {
    let data = {
      roomId,
      sender,
      content,
    }
    data = await MESSAGE_SCHEMA.validateAsync(data, { abortEarly: false })
    return await GET_DB().collection(MESSAGE_COLLECTION).insertOne(data)
  }
  catch (error) {
    throw error
  }
}
const getAllMessage = async (roomId) => {
  try {
    return await GET_DB().collection(MESSAGE_COLLECTION).find(
      { roomId },
      
    ).toArray()
  }
  catch (error) {
    throw error
  }
}
export const messageModel = {
  createMessage,
  getAllMessage
}