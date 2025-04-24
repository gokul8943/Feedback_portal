import express from 'express'
import { getFeedback, createFeedback, getFeedbackById, updateFeedback, deleteFeedback } from '../controllers/FeedbackController'

const feedbackRouter = express.Router()

feedbackRouter.post('/feedback/:userId', createFeedback as any)
feedbackRouter.get('/feedback', getFeedback as any)
feedbackRouter.get('/feedback/:id', getFeedbackById as any)
feedbackRouter.delete('/feedback/delete', deleteFeedback as any)
feedbackRouter.put('/feedback/edit', updateFeedback as any)

export default feedbackRouter