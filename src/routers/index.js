import express from 'express'
import { authRouter } from './auth.js'
import { userRouter } from './user.js'
import { roomChatRouter } from './roomChat.js'
import { messageRouter } from './message.js'
import {connectPeer} from './connectPeer.js'
const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/user', userRouter)
Router.use('/roomchat', roomChatRouter)
Router.use('/message', messageRouter)
Router.use('/peer-server', connectPeer)
export const APIs_v1 = Router