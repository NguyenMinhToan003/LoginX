import { adminService } from "~/services/adminService"

const setStatusAccount = async (req, res) => {
  try {
    const { userId, statusAccount, userAction } = req.body
    const result = await adminService.setStatusAccount({
      userId,
      statusAccount,
      userAction
    })
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const createAccountAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body
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
    
    const result = await adminService.createAccountAdmin({
      name,
      email,
      password,
      picture
    })
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await adminService.login({ email, password })
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
const getReportPosts = async (req, res) => {
  try {
    const { page, limit } = req.query
    const result = await adminService.getReportPosts({
      page,
      limit
    })
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getReportPostId = async (req, res) => {
  try {
    const { postId } = req.query
    
  }
  catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const adminController = {
  getReportPosts,
  setStatusAccount,
  createAccountAdmin,
  login,
  getReportPostId
}