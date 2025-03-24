
import { deleteFilesFromCloudinary, uploadFilesToCloudinary } from "~/configs/cloudinary"
import { friendRequestModel } from "~/models/friend_requestsModel"
import { friendModel } from "~/models/friendModel"
import { userModel } from "~/models/userModel"

const addFriendRequest = async (userId, friendId) => {
  try {
    const user = await userModel.findUserById(userId)
    const friend = await userModel.findUserById(friendId)
    if (!user || !friend) {
      throw new Error('User not found')
    }
    if (user?.friends?.includes(friendId))
      return { message: "You are already friend" }
    
    if (userId === friendId)
      return { message: "You can't send friend request to yourself" }

    const result = await friendRequestModel.addFriendRequest(userId, friendId)
    return {
      ...result,
      message: "friend request sent"
    }
  }
  catch (error) {
    throw error
  }
}

const respondFriendRequest = async (friendRequestId, status, userAction) => {
  try {
    const friendRequest = await friendRequestModel.findFriendRequestById(friendRequestId)
    if (!friendRequest) 
      return { message: "Friend request not found" }
    if (friendRequest?.status !== "pending")
      return { message: "Friend request already responded" }
    if (friendRequest?.receiverId !== userAction)
      return { message: "You are not receiver of this friend request" }
    const updateReq = await friendRequestModel.respondFriendRequest(friendRequestId, status)
    if (status === "accepted") {
      await friendModel.addFriend(friendRequest.senderId, friendRequest.receiverId)
      await friendModel.addFriend(friendRequest.receiverId, friendRequest.senderId)
    }
    return {
      ...updateReq,
      message: "Respond friend request success"
    }
  }
  catch (error) {
    throw error
  }
}

const searchUser = async (name) => {
  try {
    const users = await userModel.findUserByQuery({
      name: { $regex: name, $options: 'i' }
        // tim kiem theo ten voi regex va i la khong phan biet hoa thuong
    })
    return users
  }
  catch (error) {
    throw error
  }
}

const getFriendRequest = async (userId) => {
  try {
    const friendRequests =
      await friendRequestModel.findFriendRequestByReceiverIdAndSender(userId)
    return friendRequests
  }
  catch (error) {
    throw error
  }
}

const deleteFriendRequest = async (friendRequestId, userAction) => {
  try {
    const friendRequest = await friendRequestModel.findFriendRequestById(friendRequestId)
    if (!friendRequest)
      return { message: 'friendRequest is not found' }
    if (friendRequest?.senderId !== userAction)
      return { message: 'not Auth' }

    const result = await friendRequestModel.deleteFriendRequest(friendRequestId)
    
    return {
      ...result,
      message: "Delete friend request success"
    }
  }
  catch (error) {
    throw error
  }
}

const unfriend = async (userId, friendId) => {
  try {
    const user = await userModel.findUserById(userId)
    const friend = await userModel.findUserById(friendId)
    if (!user || !friend) {
      throw new Error('User not found')
    }
    const result = await friendModel.unfriend(userId, friendId)
    await friendModel.unfriend(friendId, userId)
    return result
  }
  catch (error) {
    throw error
  }
}

const getFriends = async (userId) => {
  try {
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    const friends = await friendModel.findFriendsByUserId(userId)
    return friends
  }
  catch (error) {
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const user = await userModel.findUserByQuery({ _id: userId })
    return user[0]
  }
  catch (error) {
    throw error
  }
}

const editUser = async (userId, data) => {
  try {
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    data.updatedAt = Date.now()
    if (data.picture.url!=='empty')  {
      await deleteFilesFromCloudinary([user.picture])
      data.picture = await uploadFilesToCloudinary([data.picture])
      data.picture = data.picture[0]// lay ra phan tu dau tien
    }
    else {
      data.picture = user.picture
    }
    data.typeAccount = user.typeAccount
    console.log(data)
    const result = await userModel.editUser(userId, data)
    return result
  }
  catch (error) {
    throw error
  }
}

export const userService = {
  addFriendRequest,
  respondFriendRequest,
  searchUser,
  getFriendRequest,
  deleteFriendRequest,
  unfriend,
  getFriends,
  getUserById,
  editUser
}