import express from 'express'
import { authRouter } from './auth.js'
import { userRouter } from './user.js'
import { roomChatRouter } from './roomChat.js'
import { messageRouter } from './message.js'
import { roomVideoCallRouter } from './roomVideoCall.js'

const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/user', userRouter)
Router.use('/roomVideoCall', roomVideoCallRouter)
Router.use('/roomchat', roomChatRouter)
Router.use('/message', messageRouter)
export const APIs_v1 = Router