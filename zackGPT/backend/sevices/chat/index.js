import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import router from './routes/chat.route.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/',router);

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from ZackGPT chat! , i am running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`ZackGPT chat is running on port ${PORT}`);
  connectDB();
});



