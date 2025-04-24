import express from 'express'
import { replyToFeedback,getUser,getUsers} from '../controllers/AdminController'

const adminRouter  = express.Router()

adminRouter.get('/user',getUser as any)
adminRouter.get('/user/:id',getUsers as any)
adminRouter.post('/feedback/reply/:id',replyToFeedback as any)

export default adminRouter