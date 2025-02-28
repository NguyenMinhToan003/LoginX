import { stringeeApi } from "../Stringee/api.js"

const createRoom = async (req, res) => {
  try {
    const token = await stringeeApi.setRestToken()
    const createRoom = await stringeeApi.createRoom(token)
    return res.status(200).json(createRoom)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getUserToken = async (req, res) => {
  try {
    const { userId } = req.body
    const token = await stringeeApi.getUserToken(userId)
    return res.status(200).json({ token })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoomToken = async (req, res) => {
  try {
    const { roomId } = req.body
    const token = await stringeeApi.getRoomToken(roomId)
    return res.status(200).json({ token })
  }
  catch(error) {
    return res.status(400).json({ message: error.message })
  }
}
export const roomVideoCallController = {
  createRoom,
  getUserToken,
  getRoomToken
}