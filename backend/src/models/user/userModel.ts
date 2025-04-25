import mongoose, { Schema } from 'mongoose'
import user from './userTypes'

const userSchema: Schema = new Schema<user>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }

})
const User = mongoose.model<user>('User', userSchema);

export default User