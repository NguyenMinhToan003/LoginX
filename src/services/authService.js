import axios from "axios";
import { comparePassword, hashPassword, verifyToken } from "../middleware/jwt/token.js"
import { userModel } from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';

const loginWithTwitter = async (user) => {
  try {
   
    const result = await userModel.findUserByIdSocial(user.id)
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
const loginWithGoogle = async (user) => {
  try {
      const result = await userModel.findUserByIdSocial(user.id)
    if(result) {
      return result
    }
    const data = {
      _id: uuidv4(),
      idSocial: user.id,
      name: user.displayName,
      picture: {
        url: user.photos[0].value,
        public_id: 'empty',
        type: 'image'
      },
      typeAccount: 'google',
      }
      
    return await userModel.createUser(data)
  }
  catch (error) {
    throw error
  }
}

const getAccessToken = async (code) => {
  try {
    const payload = {
      code: code,
      app_id: '3009287701854810432',
      grant_type: 'authorization_code'
    }
    const response = await axios.post(
      'https://oauth.zaloapp.com/v4/oa/access_token',
      payload,
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'secret_key': 'hIIX3QLrWm5vL7D8V4w4'
      }
    })
    console.log(payload)
    return response.data
  }
  catch (error) {
    throw error
  } 
}
const loginWithZalo = async (code) => {
  try {
    const data = {
      'code': code,
      'app_id': '3009287701854810432',
      'grant_type': 'authorization_code',
    }
    const token = await axios.post('https://oauth.zaloapp.com/v4/access_token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'secret_key':'hIIX3QLrWm5vL7D8V4w4'
        }
      }
    )
    const user = await axios.get(`https://graph.zalo.me/v2.0/me?fields=id,name,picture`, {
      headers: {
        'access_token': token.data.access_token
      }
    })
    console.log('user', user.data)
    const result = await userModel.findUserByIdSocial(user.data.id)

    if(result) {
      return result
    }
    const dataUser = {
      _id: uuidv4(),
      idSocial: user.data.id,
      name: user.data.name,
      picture: {
        url: user.data.picture.data.url,
        public_id: 'empty',
        type: 'image'
      },
      typeAccount: 'zalo',
    }
    return await userModel.createUser(dataUser)
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
  loginWithGoogle,
  decodeTokenLogin,
  getAccessToken,
  loginWithZalo
}