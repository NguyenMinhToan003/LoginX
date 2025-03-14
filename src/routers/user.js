import express from 'express'

import { userController } from '../controllers/userController.js';
import { userValidation } from '../validations/userValidation.js';
const router = express.Router();


router.route('/')
  .post(userController.getDatUser)
router.route('/all')
  .get(userController.getAllUser)
router.route('/request-friend')
  .post(userValidation.addFriendRequest, userController.addFriendRequest)

router.route('/respond-friend-request')
  .post(userValidation.respondFriendRequest, userController.respondFriendRequest)

router.route('/get-friend-request')
  .get()
router.route('/delete-request-friend')
  .post()
router.route('/unfriend')
  .post()

router.route('/search')
  .get(userValidation.searchUser, userController.searchUser)
export const userRouter = router;
