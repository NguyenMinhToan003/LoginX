import { messageService } from "../services/messageService.js"

const createMessage = async (req, res) => {
  try {
    const { roomId, sender, content } = req.body
    const result = await messageService.createMessage(roomId, sender, content)
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

export const messageController = {
  createMessage,
  getAllMessage,
  deleteMessage
}