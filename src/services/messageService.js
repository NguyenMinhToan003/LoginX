import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from '~/configs/cloudinary.js'
import { messageModel } from '~/models/messagesModel.js'
import { roomChatService } from './roomChatService.js'

const createMessage = async ({roomId, sender, content,followMessageId, assets,embedPostId }) => {
  try {
    const room = await roomChatService.getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    const isMember = room?.members.find(member => member._id === sender)

    if (!isMember?._id) return { message: 'You are not member of this room' }  
    if (followMessageId) {
      const followMessage = await messageModel.findMessageById(followMessageId)
      if (followMessage?.status === 'delete' || !followMessage)
        return { message: 'Follow message not found' }
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
      { roomId, sender, content, followMessageId, images, embedPostId }
    )
    return { ...message, images }
  }
  
  catch (error) {
    throw error
  }
}

const getAllMessage = async (roomId, userId) => {
  try {
    const room = await roomChatService.getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    const isMember = room?.members.find(member => member._id === userId)
    if (!isMember?._id) return { message: 'You are not member of this room' }
    const messages = await messageModel.getAllMessage(roomId)
    if (!messages) return { message: 'No messages' }
    
    return {
      messages
    }
  }
  catch (error) {
    throw error
  }
}

const deleteMessage = async (userId, messageId) => {
  try {
    const message = await messageModel.findMessageById(messageId)
    if (!message) return { message: 'Message not found' }
    if (message?.sender !== userId && userId !=='admin')
      return { message: 'You are not sender of this message' }
    if(message?.status === 'delete')
      return { message: 'This message has been deleted' }
    const result = await messageModel.deleteMessage(messageId)
    await deleteFilesFromCloudinary(message?.images)
    return result
  }
  catch (error) {
    throw error
  }
}

const bulkDeleteMessageInRoom = async (roomId) => {
  try {
    const messages = await messageModel.getAllMessage(roomId)
    for(let i = 0; i < messages.length; i++) {
      const message = messages[i]
      if (message?.images.length > 0) {
        await deleteFilesFromCloudinary(message.images)
      }
    }
    const result = await messageModel.bulkDeleteMessageInRoom(roomId)
    return result
  }
  catch (error) {
    throw error
  }
}

const getPaginateMessage = async (roomId, userId, page, limit) => {
  try {
    const room = await roomChatService.getRoom(roomId)
    if (!room) return { message: 'Room not found' }
    const isMember = room?.members.find(member => member._id === userId)
    if (!isMember?._id) return { message: 'You are not member of this room' }
    const messages = await messageModel.getPaginatedMessages(roomId, page, limit)
    if (!messages) return { message: 'No messages' }
    return messages
  }
  catch (error) {
    throw error
  }
}

export const messageService = {
  createMessage,
  getAllMessage,
  deleteMessage,
  bulkDeleteMessageInRoom,
  getPaginateMessage
}