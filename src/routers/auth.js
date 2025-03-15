import express from 'express'
import passport from 'passport'
import { authController } from '../controllers/authController.js';
import { userController } from '../controllers/userController.js';
const router = express.Router();

// Đăng nhập với Twitter
router.route('/twitter')
  .get(passport.authenticate('twitter'))

router.route('/twitter/callback')
  .get(
    passport.authenticate('twitter', { failureRedirect: '/' }),
    authController.loginWithTwitter
)

// Đăng nhập với GitHub
router.route('/github')
  .get(passport.authenticate('github'))

router.route('/github/callback')
  .get(
    passport.authenticate('github', { failureRedirect: '/' }),
    authController.loginWithGithub
  )

 // su ly sau khi lay duoc token dawng nhap 
router.route('/decode-token-login')
  .get(authController.decodeTokenLogin)

router.route('/user')
  .get(userController.getDatUser)
export const authRouter = router;
