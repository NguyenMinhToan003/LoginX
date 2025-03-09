import express from 'express'
import { roomChatValidation } from '../validations/roomChatValidation.js';
import { roomChatController } from '../controllers/roomChatController.js';



const router = express.Router();


router.route('/createRoom')
  .post(roomChatValidation.createRoom, roomChatController.createRoom)

router.route('/joinRoom')
  .post(roomChatValidation.joinRoom, roomChatController.joinRoom)

router.route('/getRoom')
  .get(roomChatValidation.getRoom, roomChatController.getRoom)

router.route('/getRoomChatByUserId')
  .get(roomChatValidation.getRoomChatByUserId, roomChatController.getRoomChatByUserId)

router.route('/deleteRoom')
  .post(roomChatValidation.deleteRoom, roomChatController.deleteRoom)

router.route('/leaveRoom')
  .post(roomChatValidation.leaveRoom, roomChatController.leaveRoom)

router.route('/updateInfoRoom')
  .post(roomChatValidation.updateInfoRoom, roomChatController.updateInfoRoom)


export const roomChatRouter = router;
