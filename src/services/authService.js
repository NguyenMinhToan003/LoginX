import { verifyToken } from "../middleware/jwt/token.js"
import { userModel } from "../models/userModel.js"

const loginWithTwitter = async (user) => {
  try {
   
    const result = await userModel.findUserById(user.id)
    if(result) {
      return result
    }
    const data = {
      _id: user.id,
      name: user.username,
      picture: user.photos[0].value,
      typeAccount: 'twitter',
    }
    return await userModel.createUser(data)
  }
  catch (error) {
    throw error
  }
}


const loginWithGithub = async (user) => {
    try {
   
    const result = await userModel.findUserById(user.id)
    if(result) {
      return result
    }
    const data = {
      _id: user.id,
      name: user.username,
      picture: user.photos[0].value,
      typeAccount: 'github',
      }

    return await userModel.createUser(data)
  }
  catch (error) {
    throw error
  }
}
const decodeTokenLogin = async (token) => {
  try {
    const decode = await verifyToken(token)
    const user = await userModel.findUserById(decode._id)

    if (user) {
      return user
    }
    return null
  }
  catch (error) {
    throw error
  }
}

export const authService = {
  loginWithTwitter,
  loginWithGithub,
  decodeTokenLogin
}