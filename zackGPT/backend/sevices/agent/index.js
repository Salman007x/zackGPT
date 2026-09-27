import 'dotenv/config';
import express from 'express';
import connectDB from './config/database.js';
import router from './routes/agent.route.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use("/",router);

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello from ZackGPT agent! , i am running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`ZackGPT agent is running on port ${PORT}`);
  connectDB();
});



