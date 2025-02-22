import express from 'express'
import { roomController } from '../controllers/roomController.js';


const router = express.Router();

// Đăng nhập với Twitter

router.route('/getAccestoken')
  .post(roomController.getAccessToken)

router.route('/getRoomToken')
  .post(roomController.getRoomToken)


export const roomRouter = router;
