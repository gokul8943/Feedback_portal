
import { Document, Schema } from "mongoose";

interface feedbackInterface extends Document {
    userId: Schema.Types.ObjectId,
    text: String,
    rating: Number,
    image: String,
    reply: String,
    createdAt: Date

}

export default feedbackInterface