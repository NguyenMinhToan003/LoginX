import { roomChatModel } from "../models/roomChatModel.js"

const createRoom = async (type, name, avartar, admins, members) => {
  try {
    const uniqueAdmins = admins.filter(
      (admin, index) => admins.indexOf(admin) === index);
    members = [...members, ...uniqueAdmins]
    const uniqueMembers = members.filter(
      (member, index) => members.indexOf(member) === index);
    
    return await roomChatModel.createRoom(type, name, avartar, uniqueAdmins, uniqueMembers)
  }
  catch (error) {
    throw error
  }
}
const joinRoom = async (roomId, members) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if (!room) return { message: "Room not found" }
    const updateRoom = await roomChatModel.joinRoom(roomId, members)
    return {
      ...updateRoom,
      message: "Join room success"
    }
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

const deleteRoom = async (roomId, userId) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if (!room) return { message: "Room not found" }
    if (room?.info?.admins.includes(userId)) {
      const result = await roomChatModel.deleteRoom(roomId)
      return {
        ...result,
        message: "Delete room success"
      }
    }
    else return { message: "You are not admin" }
  }
  catch (error) {
    throw error
  }
}

const leaveRoom = async (roomId, userId) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if (!room) return {
      message: "Room not found",
      code: -1
    }
    if (room?.info?.admins.length == 1 && room?.info?.admins[0] === userId)
      return {
        message: "You are admin, can't leave room",
        code: -1
      }
    const result = await roomChatModel.leaveRoom(roomId, userId)
    return {
      ...result,
      code: 0,
      message: "action leave room"
    }
  }
  catch (error){
    throw error
  }
}

const updateInfoRoom = async (roomId, name, avartar, admins, userAction) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if (!room) return { message: "Room not found" }
    if (!room.info.admins.includes(userAction))
      return { message: "You are not admin" }

    const uniqueAdmins = admins.filter(
      (admin, index) => admins.indexOf(admin) === index);

    
    const membersUpdate = [...room.members, ...uniqueAdmins]
    const uniqueMembers = membersUpdate.filter(
      (member, index) => membersUpdate.indexOf(member) === index);

    const result = await roomChatModel.updateInfoRoom(
      roomId,
      name,
      avartar,
      uniqueAdmins,
      uniqueMembers
    )
    return {
      ...result,
      message: "Update info room success"
    }
  }
  catch (error) {
    throw error
  }
}

export const roomChatService = {
  createRoom,
  joinRoom,
  getRoom,
  deleteRoom,
  getRoomChatByUserId,
  leaveRoom,
  updateInfoRoom
}