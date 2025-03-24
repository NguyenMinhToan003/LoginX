import express from 'express'
import passport from 'passport'
import { authController } from '../controllers/authController.js'
import { authValidation } from '~/validations/authValidation.js'
const router = express.Router()

// Đăng nhập với Twitter
router.route('/twitter')
  .get(passport.authenticate('twitter'))

router.route('/twitter/callback')
  .get(
    passport.authenticate('twitter', { failureRedirect: '/' }),
    
    (req, res) => {
      if (req.user.code === 0)
        authController.loginWithTwitter(req, res)
      else if (req.user.code === 1||req.user.code === 2) {
        res.redirect(`http://localhost:5173/addSocial/code=${req.user.code}`)
      }
    }
)

// Đăng nhập với GitHub
router.route('/github')
  .get(passport.authenticate('github'))

router.route('/github/callback')
  .get(
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      if (req.user.code === 0)
        authController.loginWithGithub(req, res)
      else if (req.user.code === 1||req.user.code === 2) {
        res.redirect(`http://localhost:5173/addSocial/code=${req.user.code}`)
      }
    }
  )

 // su ly sau khi lay duoc token dawng nhap 
router.route('/decode-token-login')
  .get(authController.decodeTokenLogin)

// Đăng nhập với Local
router.route('/login')
  .post(authValidation.login, authController.login)
router.route('/register')
  .post(authValidation.register, authController.register)
export const authRouter = router
