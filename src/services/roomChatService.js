import { userModel } from "~/models/userModel.js";
import { roomChatModel } from "../models/roomChatModel.js"
import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from "~/configs/cloudinary.js";

const createRoom = async (type, name, file, admins, members) => {
  try {
    const uniqueAdmins = admins.filter(
      (admin, index) => admins.indexOf(admin) === index);
    members = [...members, ...uniqueAdmins]
    const uniqueMembers = members.filter(
      (member, index) => members.indexOf(member) === index);
    if (type === 'private' && uniqueMembers.length > 2)
      return { message: "Private room only 2 members" }
    const exitsRoom = await roomChatModel.findRoomPrivate(uniqueMembers)
    if (exitsRoom && type === 'private') return exitsRoom
    let avartar = [file]

    if (file.url !== 'empty') {
      avartar = await uploadFilesToCloudinary([file])
    }

    return await roomChatModel.createRoom(type, name, avartar[0], uniqueAdmins, uniqueMembers)
  }
  catch (error) {
    throw error
  }
}
const findOrCreateRoomPrivate = async (userSeachId, userOrtherId) => {
  try {
    const userSearch = await userModel.findUserById(userSeachId)
    const userOrther = await userModel.findUserById(userOrtherId)
    if (!userSearch || !userOrther) return { message: "User not found" }
    const members = [userSeachId, userOrtherId]
    let exitsRoom = await roomChatModel.findRoomPrivate(members)
    
    if (exitsRoom) {
      exitsRoom.info.name = userOrther.name
      exitsRoom.info.avartar = userOrther.picture
      return exitsRoom
    }
    return await roomChatModel.createRoom(
      'private',
      userSearch.name +'-'+ userOrther.name,
      userSearch?.picture + '-' + userOrther?.picture,
      members,
      members)
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
const getRoomChatByUserId = async (userId, type) => {
  try {

    if (type !== null)
      return await roomChatModel.findRoomChatByUserIdAndType(userId, type)
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

const updateInfoRoom = async (roomId, name, file, admins, userAction) => {
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
    if (room.info.avartar.url !== 'empty') {
      await deleteFilesFromCloudinary([room.info.avartar])
    }
   
    let avartar = [file]
    if (file.url !== 'empty') {
      console.log(file)
      avartar = await uploadFilesToCloudinary([file])
    }
    const result = await roomChatModel.updateInfoRoom(
      room.type,
      roomId,
      name,
      avartar[0],
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
  findOrCreateRoomPrivate,
  joinRoom,
  getRoom,
  deleteRoom,
  getRoomChatByUserId,
  leaveRoom,
  updateInfoRoom
}