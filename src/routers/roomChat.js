import express from 'express'
import { roomChatValidation } from '../validations/roomChatValidation.js';
import { roomChatController } from '../controllers/roomChatController.js';



const router = express.Router();

// Đăng nhập với Twitter

router.route('/create')
  .post(roomChatValidation.createRoom, roomChatController.createRoom)
router.route('/join')
  .post(roomChatValidation.joinRoom, roomChatController.joinRoom)
router.route('/getRoom')
  .get(roomChatValidation.getRoom, roomChatController.getRoom)
router.route('/getRoomChatByUserId')
  .get(roomChatValidation.getRoomChatByUserId, roomChatController.getRoomChatByUserId)
export const roomChatRouter = router;
