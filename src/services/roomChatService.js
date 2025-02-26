import { roomChatModel } from "../models/roomChatModel.js"

const createRoom = async (type, name, avartar, admins, members) => {
  try {
    return await roomChatModel.createRoom(type, name, avartar, admins, members)
  }
  catch (error) {
    throw error
  }
}
const joinRoom = async (roomId, admin, members) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if(room?.info?.admins.includes(admin)) {
      const joinRoom = await roomChatModel.joinRoom(roomId, members)
      return {
        ...joinRoom,
        message : "Join room success"
      }
    }
    else return { message : "You are not admin" }
  }
  catch (error) {
    throw error
  }
}

const getRoom = async (roomId) => {
  try {
    return await roomChatModel.findInfoRoomChatById(roomId)
  }
  catch (error) {
    throw error
  }
}
const getRoomChatByUserId = async (userId) => {
  try {
    return await roomChatModel.findRoomChatByUserId(userId)
  }
  catch (error) {
    throw error
  }
}

export const roomChatService = {
  createRoom,
  joinRoom,
  getRoom,
  getRoomChatByUserId
}