import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from '~/configs/cloudinary.js'
import { messageModel } from '../models/messagesModel.js'
import { roomChatModel } from '../models/roomChatModel.js'

const createMessage = async ({roomId, sender, content,followMessageId, assets }) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)

    if(room) {
      if (room?.members.includes(sender) || room?.info?.admins.includes(sender)) {
        
        if (followMessageId) {
          const followMessage = await messageModel.findMessageById(followMessageId)
          if(followMessage?.status === 'delete' || !followMessage)
            return { message : 'Follow message not found' }
        }
        else {
          followMessageId = null
        }
        let images = []
        if (assets) {
          const fileInfo = await uploadFilesToCloudinary(assets)
          images = fileInfo
        } 

        if (!content && images.length === 0)
          return { message: 'Content or images is required' }

        const message = await messageModel.createMessage(
          {roomId, sender, content, followMessageId, images}
        )
        return {
          ...message,
          images,
          message : 'create message'
        }
      }
      else return { message : 'You are not member of this room' }
    }
    else return { message : 'Room not found' }
  }
  catch (error) {
    throw error
  }
}

const getAllMessage = async (roomId, userId) => {
  try {
    const room = await roomChatModel.findRoomById(roomId)
    if(room) {
      if(room?.members.includes(userId)|| room?.info?.admins.includes(userId)) {
        return await messageModel.getAllMessage(roomId)
      }
      else return { message : 'You are not member of this room' }
    }
    else return { message : 'Room not found' }
  }
  catch (error) {
    throw error
  }
}

const deleteMessage = async (userId, messageId) => {
  try {
    const message = await messageModel.findMessageById(messageId)
    if (!message) return { message: 'Message not found' }
    if (message?.sender !== userId)
      return { message: 'You are not sender of this message' }
    if(message?.status === 'delete')
      return { message: 'This message has been deleted' }
    const result = await messageModel.deleteMessage(messageId)
    const deleteImages = await deleteFilesFromCloudinary(message?.images)
    return {
      ...result,
      message: 'Delete message success'
    }
  }
  catch (error) {
    throw error
  }
}

export const messageService = {
  createMessage,
  getAllMessage,
  deleteMessage,
}