import express from 'express'
import passport from 'passport'
import { authController } from '../controllers/authController.js';


const router = express.Router();

// Đăng nhập với Twitter
router.route('/twitter')
  .get(passport.authenticate('twitter'))

router.route('/twitter/callback')
  .get(
    passport.authenticate('twitter', { failureRedirect: '/' }),
    authController.loginWithTwitter
)

// register 
router.route('/register')
  .post()

router.route('logout')
  .get(authController.logout)


export const authRouter = router;
