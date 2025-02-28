import express from 'express'
import { roomVideoCallValidation } from '../validation/roomVideoCallValidation.js';
import { roomVideoCallController } from '../controllers/roomVideoCallController.js';

const router = express.Router();

router.route('/create-room')
  .post(roomVideoCallController.createRoom)
router.route('/get-user-token')
  .post(roomVideoCallValidation.getUserToken, roomVideoCallController.getUserToken)
router.route('/get-room-token')
  .post(roomVideoCallValidation.getRoomToken, roomVideoCallController.getRoomToken)
export const roomVideoCallRouter = router;
