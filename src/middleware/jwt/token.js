import jwt from 'jsonwebtoken'

export const genarateToken = async (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
  } catch (error) {
    throw error
  }
}
export const verifyToken = async (token) => {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    return result
  } catch (error) {
    throw error
  }
}
