import express from 'express'
import passport from 'passport'
import { authController } from '../controllers/authController.js';
import { userController } from '../controllers/userController.js';
import { authValidation } from '~/validations/authValidation.js';
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
router.route('/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }))

router.route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.loginWithGoogle
)

 // su ly sau khi lay duoc token dawng nhap 
router.route('/decode-token-login')
  .get(authController.decodeTokenLogin)

// Đăng nhập với Local
router.route('/login')
  .post(authValidation.login, authController.login)
router.route('/register')
  .post(authValidation.register, authController.register)
export const authRouter = router;
