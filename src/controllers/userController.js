import { userModel } from "../models/userModel.js"
import { userService } from "../services/userService.js"
const getDatUser = async (req,res) => {
  try {
    const { id } = req.query
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

const addFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body
    const result = await userService.addFriendRequest(userId, friendId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const respondFriendRequest = async (req, res) => {
  try {
    const { friendRequestId, status, userAction } = req.body
    const result = await userService.respondFriendRequest(friendRequestId, status, userAction)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const searchUser = async (req, res) => {
  try {
    const { name } = req.query
    const users = await userService.searchUser(name)
    return res.status(200).json(users)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const userController = {
  getDatUser,
  getAllUser,
  addFriendRequest,
  respondFriendRequest,
  searchUser
  
}