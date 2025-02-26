import { roomChatService } from "../services/roomChatService.js"

const createRoom = async (req, res) => {
  try {
    const { type, name, avartar, admins, members } = req.body
    const result = await roomChatService.createRoom(type, name, avartar, admins, members)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const joinRoom = async (req, res) => {
  try {
    const { roomId, admin, members } = req.body
    const result = await roomChatService.joinRoom(roomId, admin, members)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoom = async (req, res) => {
  try {
    const { roomId } = req.query
    const result = await roomChatService.getRoom(roomId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoomChatByUserId = async (req, res) => {
  try {
    const { userId } = req.query
    const result = await roomChatService.getRoomChatByUserId(userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const roomChatController = {
  createRoom,
  joinRoom,
  getRoom,
  getRoomChatByUserId
}