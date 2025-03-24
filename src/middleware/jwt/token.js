import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt');
const saltRounds = 10

export const genarateToken = async (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
  } catch (error) {
    throw error}
}
export const verifyToken = async (token) => {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    return result
  } catch (error) {
    throw error
  }
}

export const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  } catch (error) {
    throw error
  }
}

export const comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash)
    return result
  } catch (error) {
    throw error
  }
}