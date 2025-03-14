import express from 'express'
import { uploadMulter } from '~/middleware/multer/multer.js';
import { postValidation } from '../validations/postValidation.js';
import { postController } from '../controllers/postController.js';

const Router = express.Router();

Router.route('/create')
  .post(
    uploadMulter.array('files', 4),
    postValidation.createPost,
    postController.createPost)

Router.route('/get-post-by-author-id')
  .get(postValidation.getPostByAuthorId, postController.getPostByAuthorId)

Router.route('/get-posts-friend')
  .get(postValidation.getPostsFriend, postController.getPostsFriend)

Router.route('/delete')
  .post(postValidation.deletePost, postController.deletePost)
Router.route('/comment')
  .post(postValidation.commentPost, postController.commentPost)
Router.route('/get-comments')
  .get(postValidation.getComments, postController.getComments)
Router.route('/get-comment-follow-comment-id')
  .get(postValidation.getCommentFollowCommentId, postController.getCommentFollowCommentId)
Router.route('/delete-comment')
  .post(postValidation.deleteComment, postController.deleteComment)

Router.route('/search')
  .get(postValidation.searchPost, postController.searchPost)
export const postRouter = Router