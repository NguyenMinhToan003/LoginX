// import express from 'express'
// import { messageController } from '~/controllers/messageController';

// import { uploadMulter } from '~/middleware/multer/multer.js';
// import { messageValidation } from '~/validations/messageValidation';


// const router = express.Router();

// // tao tin nhan
// router.route('/create')
//   .post(
//     uploadMulter.array('files', 5),
//     messageValidation.createMessage,
//     messageController.createMessage)
// router.route('/delete')
//   .post(messageValidation.deleteMessage, messageController.deleteMessage)
// router.route('/get-message-in-room')
//   .post(messageValidation.getAllMessage,messageController.getAllMessage)


// export const messageRouter = router;
