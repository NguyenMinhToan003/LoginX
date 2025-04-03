import express from 'express'
import { uploadMulter } from '~/middleware/multer/multer.js';
import { postValidation } from '../validations/postValidation.js';
import { postController } from '../controllers/postController.js';

const router = express.Router();

router.route('/create')
  .post(
    uploadMulter.array('files', 4),
    postValidation.createPost,
    postController.createPost)

router.route('/get-post-by-id')
  .get(postValidation.getPostById, postController.getPostById)
router.route('/get-post-by-author-id')
  .get(postValidation.getPostByAuthorId, postController.getPostByAuthorId)
router.route('/get-posts-index-show')
  .get(postValidation.getPostsIndexShow, postController.getPostsIndexShow)
router.route('/edit')
  .post(
    uploadMulter.array('files', 4),
    postValidation.editPost, postController.editPost)
router.route('/delete')
  .post(postValidation.deletePost, postController.deletePost)
router.route('/comment')
  .post(postValidation.commentPost, postController.commentPost)
router.route('/get-comments')
  .get(postValidation.getComments, postController.getComments)
router.route('/get-comment-follow-comment-id')
  .get(postValidation.getCommentFollowCommentId, postController.getCommentFollowCommentId)
router.route('/delete-comment')
  .post(postValidation.deleteComment, postController.deleteComment)
router.route('/interaction')
  .post(postValidation.interactionPost, postController.interactionPost)
router.route('/uninteraction')
  .post(postValidation.uninteractionPost, postController.uninteractionPost)
router.route('/search')
  .get(postValidation.searchPost, postController.searchPost)

router.route('/report')
  .post(postValidation.reportPost, postController.reportPost)
export const postRouter = router