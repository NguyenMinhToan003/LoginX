import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from '~/configs/cloudinary.js';
import { userModel } from '~/models/userModel.js';
import { roomchatMembersModel } from '~/models/roomchat_membersModel.js';
import { messageModel } from '~/models/messagesModel.js';
import { roomChatModel } from '~/models/roomChatModel';
import { messageService } from './messageService';


const createRoom = async (type, name, file, members, userId) => {
  try {
    if (type === 'private') return { message: 'Action is not allow' }
    const uniqueMembers = members.filter(
      (member, index) => members.indexOf(member) === index && member !== userId);
    let avartar = [file]

    if (file.url !== 'empty') {
      avartar = await uploadFilesToCloudinary([file])
    }
    // check userId exits
    for (let i = 0; i < uniqueMembers.length; i++) {
      const user = await userModel.findUserById(uniqueMembers[i])
      if (!user) {
        uniqueMembers.splice(i, 1)
        i--
      }
    }
    if (uniqueMembers.length === 0)
      return { message: 'Member not exits' }
    // create room
    const room = await roomChatModel.createRoom(type, name, avartar[0])
    if (room?.insertedId?.toString()!=='') {
      // add member 
      await roomchatMembersModel.bulkInsertRoomChatMembers(
        room.insertedId.toString(),
        uniqueMembers,
        'member'
      )
      // add admin
      await roomchatMembersModel.bulkInsertRoomChatMembers(
        room.insertedId.toString(),
        [userId],
        'admin'
      )
    }
    return {
      ...room,
      membersCount: uniqueMembers.length+1,
    }
  }
  catch (error) {
    throw error
  }
}
const findOrCreateRoomPrivate = async (userSeachId, userOrtherId) => {
  try {
    const userSearch = await userModel.findUserById(userSeachId)
    const userOrther = await userModel.findUserById(userOrtherId)
    if (!userSearch || !userOrther) return { message: 'User not found' }
    const members = [userSeachId, userOrtherId]
    let roomPrivateUserSearch =
      await roomchatMembersModel.findRoomsPrivateByUserId(userSeachId)
    let roomPrivateUserOrther =
      await roomchatMembersModel.findRoomsPrivateByUserId(userOrtherId)
    // kiem tra xem co room trung id khong 
    let exitsRoom = roomPrivateUserSearch?.find(
      roomSearch => roomPrivateUserOrther?.some(
        roomOrther => roomOrther._id.toString() === roomSearch._id.toString()
      )
    )
    if (exitsRoom) {
      exitsRoom.name = userOrther.name
      exitsRoom.avatar = userOrther.picture
      return exitsRoom
    }
    else {
      const room = await roomChatModel.createRoom('private', 'room-private', null)
      if (room?.insertedId?.toString()!=='') {
        await roomchatMembersModel.bulkInsertRoomChatMembers(
          room.insertedId.toString(),
          members,
          'admin'
        )
      }
      return room
    }
  }
  catch (error) {
    throw error
  }
}
const joinRoom = async (roomId, members) => {
  try {
    const room = await getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    if(room.type === 'private') return { message: 'Action is not allow' }
    const roomMemberIds = room.members.map(member => member._id.toString())
    const uniqueMembers = members.filter(
      (member, index) => members.indexOf(member) === index);
    let newMembers = uniqueMembers.filter(
      member => !roomMemberIds.includes(member)
    )
   
    // loai bo userId khong ton tai
    for (let i = 0; i < newMembers.length; i++) {
      const user = await userModel.findUserById(newMembers[i])
      if (!user) {
        newMembers.splice(i, 1)
        i--
      }
    }
    if (newMembers.length === 0)
      return { message: 'Member already in room or userId not exits' }
    const result = await roomchatMembersModel.bulkInsertRoomChatMembers(
      roomId,
      newMembers,
      'member'
    )
    return result
  }
  catch (error) {
    throw error
  }
}

const getRoom = async (roomId) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if (!room) return { message: 'Room not found' }
    room.members = await roomchatMembersModel.findMembersInRoomChatId(roomId)
    room.totalPage = await messageModel.getTotalPageMessagePaginateInRoom(roomId,30)
    return room
  }
  catch (error) {
    throw error
  }
}
const getRoomChatByUserId = async (userId, type) => {
  try {
    let rooms = []
    if (type == 'private')
      rooms= await roomchatMembersModel.findRoomsPrivateByUserId(userId)
    else if (type == 'group')
      rooms= await roomchatMembersModel.findRoomsGroupByUserId(userId)
    else rooms = await roomchatMembersModel.findRoomsChatByUserId(userId)
    // add lastMessage to room
    for (let i = 0; i < rooms.length; i++) {
      const lastMessage = await messageModel.getLastMessageInRoom(rooms[i]._id.toString())
      rooms[i].lastMessage = lastMessage
    }
    return rooms
  }
  catch (error) {
    throw error
  }
}

const deleteRoom = async (roomId, userId) => {
  try {
    const room = await getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    const isCheckAdmin = room?.members?.find(
      member => member._id.toString() === userId && member.role === 'admin'
    )
    if (!isCheckAdmin) return { message: 'You are not admin' }
    await roomchatMembersModel.deleteRoomChatMembersByRoomId(roomId)
    if (room.avatar.url !== 'empty') {
      await deleteFilesFromCloudinary([room.avatar])
    }
    // delete messages in room
    await messageService.bulkDeleteMessageInRoom(roomId)
    return await roomChatModel.deleteRoom(roomId)

  }
  catch (error) {
    throw error
  }
}

const leaveRoom = async (roomId, userId) => {
  try {
    const room = await getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    if (room.type === 'private') return { message: 'Action is not allow' }
    const member = room.members.find(member => member._id === userId)

    if (!member) return { message: 'You are not member' }
    if (member.role === 'admin') {
      const admins = room.members.filter(member => member.role === 'admin')
      if (admins.length <= 1) return { message: 'You are admin' }
    }
    return  await roomchatMembersModel.memberLeaveRoom(roomId, userId)
  }
  catch (error){
    throw error
  }
}

const updateInfoRoom = async (roomId, name, file, userAction) => {
  try {
    const room = await getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    const userActionInRoom = room.members.find(
      member => member._id.toString() === userAction
    )
    if (!userActionInRoom) return { message: 'You are not member' }
    // if(userActionInRoom.role !== 'admin')
    //   return { message: 'You are not admin' }

    let avatar = [file]
    if (file.url !== 'empty') {
      await deleteFilesFromCloudinary([room.avatar])
      avatar = await uploadFilesToCloudinary([file])
    }
    else {
      avatar = [room.avatar]
    }
    return await roomChatModel.updateInfoRoom(roomId, name, avatar[0])
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
  updateInfoRoom,
}