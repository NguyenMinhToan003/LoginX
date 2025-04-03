import express from 'express'
import { adminController } from '~/controllers/adminController'
import { uploadMulter } from '~/middleware/multer/multer'
import { adminValidation } from '~/validations/adminValidation'
const router = express.Router()

router.route('/set-status-account')
  .post(adminValidation.setStatusAccount, adminController.setStatusAccount)

router.route('/create-accout-admin')
  .post(
    uploadMulter.array('files', 1),
    adminValidation.createAccountAdmin,
    adminController.createAccountAdmin)
router.route('/login')
  .post(adminValidation.login, adminController.login)
router.route('/get-report-posts')
  .get(adminValidation.getReportPosts, adminController.getReportPosts)
router.route('/get-report-postId')
  .get(adminValidation.getReportPostId, adminController.getReportPostId)
export const adminRouter = router