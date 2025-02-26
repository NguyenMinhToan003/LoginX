import express from 'express'
import { messageValidation } from '../validation/messageValidation.js';
import { messageController } from '../controllers/messageController.js';




const router = express.Router();

// Đăng nhập với Twitter

router.route('/create')
  .post(messageValidation.createMessage, messageController.createMessage)
router.route('/all')
  .post(messageValidation.getAllMessage,messageController.getAllMessage)

export const messageRouter = router;
