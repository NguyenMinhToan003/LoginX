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
// https://loginx.onrender.com/api/auth/zalo?oa_id=1929322143428298323&code=o9K3UMl-wIkgdcvFHQoLNQEjRNaxz9WZvwaRHHZys3c3e2fSSyMf0u_4OIbv-wG7vgzPMpFEhGN0Z5PAKTQlBA6-AqzBbUPLZRetGIpbnndyiqToDFMoQlEuSIC5ZAD6u-LORK3NdK-9Y6CUNjVWTvF46pHDYVjunxSoH7VGaN24zb171ipzGOVFFc5VzAKwpQb1Mp7OqXxovIG-59NZ7PVOPWK2sBS1dyyp4qYDp76uyamIHD75GTR1UHfGZD4RteL53qEJuHl9tcWYVE2s4e_QHoaOahSuagmIDXQopwNSnKMw64YEyDyO7IK38v_LnnzTzqspcwwUxM_iPgo0WiJ1JlC0qF6crFiqlc5oCixh6VQcDAPSVipJamLExna3glkE15Ea4aQp-SaOCTia88Ntnr0ufbeEpvN9UUDQlL0qxim2

const getAccessToken = async (code) => {
  try {
    const payload = {
      code: 'o9K3UMl-wIkgdcvFHQoLNQEjRNaxz9WZvwaRHHZys3c3e2fSSyMf0u_4OIbv-wG7vgzPMpFEhGN0Z5PAKTQlBA6-AqzBbUPLZRetGIpbnndyiqToDFMoQlEuSIC5ZAD6u-LORK3NdK-9Y6CUNjVWTvF46pHDYVjunxSoH7VGaN24zb171ipzGOVFFc5VzAKwpQb1Mp7OqXxovIG-59NZ7PVOPWK2sBS1dyyp4qYDp76uyamIHD75GTR1UHfGZD4RteL53qEJuHl9tcWYVE2s4e_QHoaOahSuagmIDXQopwNSnKMw64YEyDyO7IK38v_LnnzTzqspcwwUxM_iPgo0WiJ1JlC0qF6crFiqlc5oCixh6VQcDAPSVipJamLExna3glkE15Ea4aQp-SaOCTia88Ntnr0ufbeEpvN9UUDQlL0qxim2',
      app_id: '3009287701854810432',
      grant_type: 'authorization_code'
    }
    const response = await axios.post('https://oauth.zaloapp.com/v4/oa/access_token', payload, {
      headers: {
        'Content-Type': 'application/json',
        'secret_key': 'hIIX3QLrWm5vL7D8V4w4'
      }
    })
    return response.data
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
  getAccessToken
}