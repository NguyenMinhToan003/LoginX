// import express from 'express'
// import { roomChatValidation } from '../backup/roomChatValidation.js';
// import { roomChatController } from '../backup/roomChatController.js';
// import { uploadMulter } from '~/middleware/multer/multer.js';
// import { roomChatAController } from '~/controllers/roomChatController.js';
// import { roomChatAValidation } from '~/validations/roomChatValidation.js';



// const router = express.Router();

// // tao moi phong chat
// router.route('/create')
//   .post(
//     uploadMulter.array('files', 1),
//     roomChatAValidation.createRoom,
//     roomChatAController.createRoom)
// router.route('/find-or-create-room-private')
//   .post(
//     roomChatAValidation.findOrCreateRoomPrivate,
//     roomChatAController.findOrCreateRoomPrivate)
// // tham gia phong chat
// router.route('/join')
//   .post(roomChatAValidation.joinRoom, roomChatAController.joinRoom)
// // lay thong tin phogn chat 
// router.route('/get-room-info')
//   .get(roomChatAValidation.getRoom, roomChatAController.getRoom)
// // lay thong tin phong chat so huu
// router.route('/get-list-room-info-by-userId')
//   .get(roomChatAValidation.getRoomChatByUserId, roomChatAController.getRoomChatByUserId)
// // xoa phong chat
// router.route('/delete')
//   .post(roomChatAValidation.deleteRoom, roomChatAController.deleteRoom)
// // thoat khoi phong chat
// router.route('/leave')
//   .post(roomChatAValidation.leaveRoom, roomChatAController.leaveRoom)
// // cap nhat thong tin phong chat
// router.route('/update-info')
//   .post(
//     uploadMulter.array('files', 1),
//     roomChatAValidation.updateInfoRoom,
//     roomChatAController.updateInfoRoom)
// export const roomChatARouter = router;
