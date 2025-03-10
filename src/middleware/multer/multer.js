import multer from 'multer'
import fs from 'fs/promises'
// Lưu file tạm trên máy cục bộ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, 'src/uploads/') // Thư mục lưu tạm file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

// Khởi tạo Multer với cấu hình trên
export const uploadMulter = multer({ storage })

export const removeFile = async (path) => {
  try {
    await fs.unlink(path)
  }
  catch (error) {
    throw error
  }
}