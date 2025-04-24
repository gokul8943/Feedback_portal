import express, { Router } from "express"
import { register, login } from "../controllers/AuthController"

const authRouter = express.Router()

authRouter.post('/login', login as any)
authRouter.post('/register', register)


export default authRouter