import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { CONNECT_DB, GET_DB } from './configs/db.js'
import { APIs_v1 } from './routers/index.js'
import { twitterStrategy } from './passport/TwitterStrategy .js'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {
  const app = express()
  // Cấu hình session middleware
  app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt 'secure: true' nếu bạn sử dụng HTTPS,
    express: 24 * 60 * 60 * 1000
  }))

  // Khởi tạo passport
  app.use(passport.initialize())
  app.use(passport.session())
  // Cấu hình Passport
  twitterStrategy()  // Khởi tạo chiến lược Twitter
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  // Sử dụng router
  app.use('/api', APIs_v1)
  app.route('/').get((req, res) => {
    res.json({
      message: 'Welcome to my server',
      data: req.user || 'not user'
    })
  })

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found'
    })
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}

(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
    await GET_DB()
    console.log('Connected to database successfully')
  } catch (error) {
    console.log('Error when starting server: ', error)
  }
})()
