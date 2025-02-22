import express from 'express'

import { userController } from '../controllers/userController.js';
const router = express.Router();

// Đăng nhập với Twitter

router.route('/')
  .post(userController.getUser)



export const userRouter = router;
