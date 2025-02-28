import express from 'express'

import { userController } from '../controllers/userController.js';
const router = express.Router();


router.route('/')
  .post(userController.getUser)
router.route('/all')
  .get(userController.getAllUser)

export const userRouter = router;
