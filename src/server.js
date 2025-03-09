import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { CONNECT_DB, GET_DB } from './configs/db.js'
import { APIs_v1 } from './routers/index.js'
import { twitterStrategy } from './middleware/passport/twitterStrategy.js' 
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { gitHubStrategy } from './middleware/passport/githubStrategy.js'
import cors from 'cors'
import http from 'http'

import { socketConnection } from './socket/index.js'

const START_SERVER = () => {
  const app = express()
  app.use(cors(
    {
      origin: process.env.FRONTEND_ENDPOINT,
      methods: "GET,POST,PUT,DELETE",
      credentials: true
    }
  ))

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
  passport.serializeUser((user, cb) => {
    cb(null, user); // Lưu thông tin người dùng vào session
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj); // Khi lấy lại thông tin người dùng từ session
  });
  // Cấu hình Passport
  twitterStrategy()  // Khởi tạo chiến lược Twitter
  gitHubStrategy() // Khởi tạo chiến lược GitHub
  
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
  const server = http.createServer(app)

  socketConnection(server)

  server.listen(process.env.PORT || 4000, () => {
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
