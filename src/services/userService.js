
import { friendRequestModel } from "~/models/friend_requestsModel"
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
    const findReqBy2User =
      await friendRequestModel.findFriendRequestBy2User(userId, friendId)
    if (findReqBy2User)
      return { message: "Friend request already sent" }
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
    if(updateReq && status === "accepted") {
      await userModel.addFriend(friendRequest?.senderId, friendRequest?.receiverId)
      await userModel.addFriend(friendRequest?.receiverId, friendRequest?.senderId)
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

export const userService = {
  addFriendRequest,
  respondFriendRequest,
  searchUser
}