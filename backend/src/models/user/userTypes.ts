import { Document } from "mongoose";

interface userInterface extends Document {
    name: String,
    email: String,
    password: String
    role: String
}

export default userInterface