import express from 'express'

import { userController } from '../controllers/userController.js';
const router = express.Router();


router.route('/')
  .post(userController.getUser)



export const userRouter = router;
