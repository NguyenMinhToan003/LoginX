import express from 'express'
import { messageValidation } from '../validations/messageValidation.js';
import { messageController } from '../controllers/messageController.js';

const router = express.Router();


router.route('/create')
  .post(messageValidation.createMessage, messageController.createMessage)
router.route('/delete')
  .post(messageValidation.deleteMessage, messageController.deleteMessage)
router.route('/all')
  .post(messageValidation.getAllMessage,messageController.getAllMessage)

export const messageRouter = router;
