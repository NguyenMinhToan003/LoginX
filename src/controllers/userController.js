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

const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.query
    const result = await userService.getFriendRequest(userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteFriendRequest = async (req, res) => {
  try {
    const { friendRequestId, userAction } = req.body
    const result = await userService.deleteFriendRequest(friendRequestId, userAction)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const unfriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body
    const result = await userService.unfriend(userId, friendId)
    return res.status(200).json(result) 
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getFriends = async (req, res) => {
  try {
    const { userId } = req.query
    const result = await userService.getFriends(userId)
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.query
    const user = await userService.getUserById(userId)
    return res.status(200).json(user)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const editUser = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      email,
      address,
      userName,
      background,
      
      link,
      bio,
      history
    } = req.body
    const files = req.files ? req.files : null
    let picture = files?.length > 0 
      ? {
        url: files[0]?.path,
        type: files[0]?.mimetype
      }
      : {
        url: 'empty',
        public_id: 'empty',
        type: 'empty'
      }
    console.log(req.files)
    const user = await userService.editUser(
      userId, {
        name,
        picture,
        phone,
        email,
        address,
        userName,
        background,
        link,
        bio,
        history
      }
    )

    return res.status(200).json(user)
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
  searchUser,
  getFriendRequest,
  deleteFriendRequest,
  unfriend,
  getFriends,
  getUserById,
  editUser,
}