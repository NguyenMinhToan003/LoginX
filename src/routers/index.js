import express from 'express'
import { authRouter } from './auth.js'
import { userRouter } from './user.js'
import { roomChatRouter } from './roomChat.js'
import { messageRouter } from './message.js'
import {connectPeer} from './connectPeer.js'
import { postRouter } from './post.js'
import { adminRouter } from './admin.js'
const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/user', userRouter)
Router.use('/roomchat', roomChatRouter)
Router.use('/message', messageRouter)
Router.use('/post', postRouter)
Router.use('/peer-server', connectPeer)
Router.use('/admin', adminRouter)
export const APIs_v1 = Router