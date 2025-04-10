import express from 'express'
import { roomChatController } from '~/controllers/roomChatController';
import { uploadMulter } from '~/middleware/multer/multer.js';
import { roomChatValidation } from '~/validations/roomChatValidation';



const router = express.Router();

// tao moi phong chat
router.route('/create')
  .post(
    uploadMulter.array('files', 1),
    roomChatValidation.createRoom,
    roomChatController.createRoom)
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
router.route('/search')
  .get(roomChatValidation.searchRooms, roomChatController.searchRooms)
router.route('/update-info')
  .post(
    uploadMulter.array('files', 1),
    roomChatValidation.updateInfoRoom,
    roomChatController.updateInfoRoom)
export const roomChatRouter = router;
