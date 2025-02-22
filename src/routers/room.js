import express from 'express'
import { roomController } from '../controllers/roomController.js';


const router = express.Router();

// Đăng nhập với Twitter

router.route('/getAccestoken')
  .post(roomController.getAccessToken)


export const roomRouter = router;
