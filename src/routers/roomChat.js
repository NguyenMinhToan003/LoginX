import express from 'express'
import { roomChatValidation } from '../validations/roomChatValidation.js';
import { roomChatController } from '../controllers/roomChatController.js';



const router = express.Router();

// tao moi phong chat
router.route('/create')
  .post(roomChatValidation.createRoom, roomChatController.createRoom)
router.route('/find-or-create-room-private')
  .post(roomChatValidation.findOrCreateRoomPrivate, roomChatController.findOrCreateRoomPrivate)
// tham gia phong chat
router.route('/join')
  .post(roomChatValidation.joinRoom, roomChatController.joinRoom)
// lay thong tin phogn chat 
router.route('/get-room-info')
  .get(roomChatValidation.getRoom, roomChatController.getRoom)
// lay thong tin phong chat so huu
router.route('/get-list-room-info-by-userId')
  .get(roomChatValidation.getRoomChatByUserId, roomChatController.getRoomChatByUserId)
// xoa phong chat
router.route('/delete')
  .post(roomChatValidation.deleteRoom, roomChatController.deleteRoom)
// thoat khoi phong chat
router.route('/leave')
  .post(roomChatValidation.leaveRoom, roomChatController.leaveRoom)
// cap nhat thong tin phong chat
router.route('/update-info')
  .post(roomChatValidation.updateInfoRoom, roomChatController.updateInfoRoom)
export const roomChatRouter = router;
