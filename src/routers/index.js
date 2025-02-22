import express from 'express'
import { authRouter } from './auth.js'
import { userRouter } from './user.js'
import { roomRouter } from './room.js'
const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/user', userRouter)
Router.use('/room', roomRouter)

export const APIs_v1 = Router