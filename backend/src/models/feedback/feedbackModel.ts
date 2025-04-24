import mongoose from "mongoose";
import feedback from './feedbackTypes'

const feedbackSchema = new mongoose.Schema<feedback>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String },
    reply: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const Feedback = mongoose.model<feedback>('Feedback', feedbackSchema);

export default Feedback