import express from 'express'
import { messageValidation } from '../validations/messageValidation.js';
import { messageController } from '../controllers/messageController.js';
import { uploadMulter } from '~/middleware/multer/multer.js';


const router = express.Router();

// tao tin nhan
router.route('/create')
  .post(
    uploadMulter.array('files', 5),
    messageValidation.createMessage,
    messageController.createMessage)
router.route('/delete')
  .post(messageValidation.deleteMessage, messageController.deleteMessage)
router.route('/get-message-in-room')
  .post(messageValidation.getAllMessage,messageController.getAllMessage)
router.route('/rep-message')
  .post(messageValidation.repMessage,messageController.repMessage)
export const messageRouter = router;
