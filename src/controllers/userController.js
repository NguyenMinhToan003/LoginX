import { userModel } from "../models/userModel.js"

const getUser = async (req,res) => {
  try {
    const { id } = req.body
    const user = await userModel.findUserById(id)
    console.log(user)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'not user' })
  }
  catch (error) {
    throw error
  }
}

export const userController = {
  getUser
}