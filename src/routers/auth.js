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

router.route('/github')
  .get(passport.authenticate('github'))

router.route('/github/callback')
  .get(
    passport.authenticate('github', { failureRedirect: '/' }),
    authController.loginWithGithub
  )

// register 
router.route('/register')
  .post()

router.route('logout')
  .get(authController.logout)

router.route('/user')
  .post(userController.getUser)
export const authRouter = router;
