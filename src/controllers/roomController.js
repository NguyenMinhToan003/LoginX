import { tokenStringee } from "../utils/tokenStringee.js";
const getAccessToken = (req,res) => {
  try {
    return res.status(200).json({accessToken: tokenStringee.getAccessToken() })
  }
  catch (error) {
    throw error
  }
}
export const roomController = {
  getAccessToken
}