import express from 'express'
import { roomVideoCallValidation } from '../validation/roomVideoCallValidation.js';
import { roomVideoCallController } from '../controllers/roomVideoCallController.js';

const router = express.Router();

// Đăng nhập với Twitter
router.route('/getAccessToken')
  .get(
    roomVideoCallValidation.roomVideoCallController,
    roomVideoCallController.getAccessToken)

router.route('/getRoomVideoCallToken')
  .get(roomVideoCallValidation.getRoomToken,roomVideoCallController.getRoomToken)

export const roomVideoCallRouter = router;
