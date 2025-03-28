import { messageService } from "../services/messageService.js"

const createMessage = async (req, res) => {
  try {
    const { roomId, sender, content, followMessageId, embedPostId=null} = req.body
    const files = req.files ? req.files : null
    let assets
    if (files) {
      assets = files.map(file => {
        return {
          url: file.path,
          type: file.mimetype
        }
      })
    }
    const result = await messageService.createMessage(
      {roomId, sender, content, followMessageId, assets, embedPostId}
    )
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getAllMessage = async (req, res) => {
  try {
    const { roomId, userId } = req.body
    const result = await messageService.getAllMessage(roomId, userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteMessage = async (req, res) => {
  try {
    const { userId, messageId } = req.body
    const result = await messageService.deleteMessage(userId, messageId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const repMessage = async (req, res) => {
  try {
    const { messageId, authorId, content, followMessageId } = req.body
    const result = await messageService.repMessage(
      {messageId, authorId, content, followMessageId}
    )
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}



export const messageController = {
  createMessage,
  getAllMessage,
  deleteMessage,
  repMessage,
}