import { ObjectId } from "mongodb"
import { uploadFilesToCloudinary } from "~/configs/cloudinary"
import { comparePassword, hashPassword } from "~/middleware/jwt/token"
import { adminModel } from "~/models/adminModel"
import { postReportModel } from "~/models/post_reportModel"
import { userModel } from "~/models/userModel"

const setStatusAccount = async ({ userId, statusAccount, userAction }) => {
  try {
    const admin = await adminModel.findAdminByQuery({ _id: new ObjectId(userAction) })
    if (!admin) return { message: 'Admin not found' }
    const user = await userModel.findUserById(userId)
    if (!user) return { message: 'User not found' }
    if (user?.statusAccount === statusAccount) return { message: 'User already has this role' }
    const result = await userModel.editUser(userId, { statusAccount: statusAccount })
    return result
  }
  catch (error) {
    throw error
  }
}
const createAccountAdmin = async ({name, email, password, picture}) => {
  try {
    const checkUserExist = await adminModel.findAdminByQuery({ email })
    if (checkUserExist) return { message: 'Email already exists' }
    if (picture.url!=='empty')  {
      picture = await uploadFilesToCloudinary([picture])
      picture = picture[0]// lay ra phan tu dau tien
    }
    const hasspassword = await hashPassword(password) 
    return await adminModel.createAccount({ name, email, password: hasspassword, picture })
  }
  catch (error) {
    throw error
  }
}
const login = async ({ email, password })=>{
  try {
    const admin = await adminModel.findAdminByQuery({ email })
    if (!admin) return { message: 'Email not found' }
    const checkPassword = await comparePassword(password, admin.password)
    if (!checkPassword) return { message: 'email or password incorrect' }
    delete admin.password
    return admin
  }
  catch (error) {
    throw error
  }
}

const getReportPosts = async ({ page, limit }) => {
  try {
    const result = await postReportModel.getReportPosts( page, limit )
    if (result.length === 0) return { message: 'No report posts' }
    return result
  }
  catch (error) {
    throw error
  }
}

export const adminService = {
  setStatusAccount,
  createAccountAdmin,
  login,
  getReportPosts
}