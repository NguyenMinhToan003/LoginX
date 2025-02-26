
import { tokenStringee } from "../utils/tokenStringee.js"

const getAccessToken = async (req, res) => {
  try {
    const { userId } = req.query
    const accessToken = tokenStringee.generateAccessToken(userId)
    return res.status(200).json({ accessToken })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getRoomToken = async (req, res) => {
  try {
    const { roomId } = req.query
    // name random
    const roomToken = tokenStringee.generateRoomToken(roomId)
    return res.status(200).json({ roomToken })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const roomVideoCallController = {
  getRoomToken,
  getAccessToken
}