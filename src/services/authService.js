import { comparePassword, hashPassword, verifyToken } from "../middleware/jwt/token.js"
import { userModel } from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';

const loginWithTwitter = async (user) => {
  try {
   
    const result = await userModel.findUserByIdSocial(user.id)
    console.log(result)
    if(result) {
      return result
    }
    const data = {
      _id: uuidv4(),
      idSocial: user.id,
      name: user.username,
      picture: {
        url: user.photos[0].value,
        public_id: 'empty',
        type: 'image'
      },
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
      const result = await userModel.findUserByIdSocial(user.id)
      console.log(result)
    if(result) {
      return result
    }
    const data = {
      _id: uuidv4(),
      idSocial: user.id,
      name: user.username,
      picture: {
        url: user.photos[0].value,
        public_id: 'empty',
        type: 'image'
      },
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
const register = async ({ email, password, name }) => {
  try {
    const result = await userModel.findUserByQuery({ email: email })
    if (result.length > 0) {
      return { message: 'Email already exists' }
    }
    const hasspassword = await hashPassword(password) 
    const data = {
      _id: uuidv4(),
      name: name,
      email: email,
      password: hasspassword,
      typeAccount: 'local',
    }
      
    return await userModel.createUser(data)
  }
  catch (error) {
    throw error
  }
}
const loginLocal = async ({ email, password }) => {
  try {
    const result = await userModel.findUserByEmail(email)
    if (!result) {
      return { message: 'Email or Password is incorrect' }
    } 
    const comparePas = await comparePassword(password, result.password)
    if (!comparePas) {
      return { message: 'Email or Password is incorrect' }
    }
    delete result.password
    return result
  }
  catch (error) {
    throw error
  }
}

export const authService = {
  register,
  loginLocal,
  loginWithTwitter,
  loginWithGithub,
  decodeTokenLogin
}