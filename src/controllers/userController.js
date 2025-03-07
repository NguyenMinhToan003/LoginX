import { userModel } from "../models/userModel.js"

const getUser = async (req,res) => {
  try {
    const { id } = req.body
    const user = await userModel.findUserById(id)

    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'not user' })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getAllUser= async (req,res) => {
  try {
    const user = await userModel.findAllUser()

    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'not user' })
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const userController = {
  getUser,
  getAllUser
}