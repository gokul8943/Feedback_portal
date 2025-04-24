import express, { Router } from "express"
import { register, login } from "../controllers/AuthController"

const authRouter = express.Router()

authRouter.post('/sign-in', login as any)
authRouter.post('/sign-up', register)


export default authRouter