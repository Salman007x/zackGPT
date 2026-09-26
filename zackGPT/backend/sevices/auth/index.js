import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';
import connectDB from './config/database.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import firebaseApp from './config/firebase.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.send('Hello from ZackGPT auth! , i am running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`ZackGPT auth is running on port ${PORT}`);
  connectDB();
  firebaseApp; 
});



