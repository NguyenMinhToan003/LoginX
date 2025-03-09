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
    const { roomId, members } = req.body
    const result = await roomChatService.joinRoom(roomId, members)
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

const deleteRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body
    const result = await roomChatService.deleteRoom(roomId,userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const leaveRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body
    const result = await roomChatService.leaveRoom(roomId,userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const updateInfoRoom = async (req, res) => {
  try {
    const { roomId, name, avartar, admins, userAction } = req.body
    const result = await roomChatService.updateInfoRoom(
      roomId,
      name,
      avartar,
      admins,
      userAction
    )
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
  deleteRoom,
  getRoomChatByUserId,
  leaveRoom,
   updateInfoRoom
}