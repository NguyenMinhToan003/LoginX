import express from 'express'
import { authRouter } from './auth.js'
const Router = express.Router()

Router.use('/auth', authRouter)

export const APIs_v1 = Router