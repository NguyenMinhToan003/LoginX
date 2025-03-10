import express from 'express'
import { uploadMulter } from '~/middleware/multer/multer.js';
import { postValidation } from '../validations/postValidation.js';
import { postController } from '../controllers/postController.js';

const Router = express.Router();

Router.route('/create-post')
  .post(
    uploadMulter.array('files', 4),
    postValidation.createPost,
    postController.createPost)

Router.route('/get-post-by-author-id')
  .get(postValidation.getPostByAuthorId, postController.getPostByAuthorId)

Router.route('/get-posts-friend')
  .get(postValidation.getPostsFriend, postController.getPostsFriend)
export const postRouter = Router