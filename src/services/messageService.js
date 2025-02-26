import { messageModel } from "../models/messagesModel.js"
import { roomChatModel } from "../models/roomChatModel.js"

const createMessage = async (roomId, sender, content) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    console.log(room)
    if(room) {
      if(room?.members.includes(sender)) {
        const message = await messageModel.createMessage(roomId, sender, content)
        return {
          ...message,
          message : "Create message success"
        }
      }
      else return { message : "You are not member of this room" }
    }
    else return { message : "Room not found" }
  }
  catch (error) {
    throw error
  }
}

const getAllMessage = async (roomId, userId) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if(room) {
      if(room?.members.includes(userId)) {
        return await messageModel.getAllMessage(roomId)
      }
      else return { message : "You are not member of this room" }
    }
    else return { message : "Room not found" }
  }
  catch (error) {
    throw error
  }
}

export const messageService = {
  createMessage,
  getAllMessage
}