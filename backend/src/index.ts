import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDB from "./config/dbConnection";
import authRouter from "./routes/AuthRoutes";
import feedbackRouter from "./routes/FeedbackRouter";
import adminRouter from "./routes/AdminRouter";

dotenv.config()
const app = express()


const Port = process.env.PORT || 3000

ConnectDB()
const corsOptions = {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(express.json());
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cors(corsOptions))

app.use('/user', authRouter)
app.use('/api', feedbackRouter)
app.use('/admin', adminRouter)

app.listen(Port, () => {
        console.log(`http://localhost:${Port}`);
})