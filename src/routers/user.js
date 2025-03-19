import express from 'express'

import { userController } from '../controllers/userController.js';
import { userValidation } from '../validations/userValidation.js';
const router = express.Router();


router.route('/')
  .post(userController.getDatUser)
router.route('/get-user-by-id')
  .get(userValidation.getUserById, userController.getUserById)
router.route('/edit')
  .post(userValidation.editUser, userController.editUser)
router.route('/all')
  .get(userController.getAllUser)
router.route('/request-friend')
  .post(userValidation.addFriendRequest, userController.addFriendRequest)
router.route('/get-friends')
  .get(userValidation.getFriends, userController.getFriends)
router.route('/respond-friend-request')
  .post(userValidation.respondFriendRequest, userController.respondFriendRequest)
router.route('/get-friend-request')
  .get(userValidation.getFriendRequest, userController.getFriendRequest)
router.route('/delete-request-friend')
  .post(userValidation.deleteFriendRequest, userController.deleteFriendRequest)
router.route('/unfriend')
  .post(userValidation.unfriend, userController.unfriend)
router.route('/search')
  .get(userValidation.searchUser, userController.searchUser)
export const userRouter = router;
