import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config' // Đảm bảo bạn đã cấu hình biến môi trường
import { removeFile } from '../middle/multer'

// Cấu hình Cloudinary

export const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.API_CLOUDINARY_NAME,
    api_key: process.env.API_CLOUDINARY_KEY,
    api_secret: process.env.API_CLOUDINARY_SECRET
  })
}


export const uploadFilesToCloudinary = async (files) => {
  const uploadedFiles = []

  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.url, {
        folder: 'CHAT_X', // Thư mục trên Cloudinary
        resource_type: 'auto'// Loại file
      })

      uploadedFiles.push({
        url: result.secure_url, // URL file trên Cloudinary
        public_id: result.public_id // ID file trên Cloudinary
      })
      removeFile(file.url)
    } catch (error) {
      console.error('Error uploading file:', file.url, error.message)
    }
  }

  return uploadedFiles
}

export const deleteFilesFromCloudinary = async (files) => {
  try {
    let result = {
      ok: 0,
      error: 0
    }
    for (const file of files) {
      const res = await cloudinary.uploader.destroy(file.public_id)
      if (res.result === 'ok') {
        result.ok++
      }
      else {
        result.error++
      }
    }
    return result
  }
  catch (error) {
    throw error
  }
}