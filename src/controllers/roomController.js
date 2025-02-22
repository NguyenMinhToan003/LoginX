import { tokenStringee } from "../utils/tokenStringee.js";
const getAccessToken = (req,res) => {
  try {
    const id = req.body.id
    return res.status(200).json({accessToken: tokenStringee.getAccessToken(id) })
  }
  catch (error) {
    throw error
  }
}


const getRoomToken = (req, res) => {
  try {
    const id = req.body.roomId
    return res.status(200).json({roomToken: tokenStringee.getRoomToken(id) })
  }
  catch (error) {
    throw error
  }
}
export const roomController = {
  getAccessToken,
  getRoomToken
}