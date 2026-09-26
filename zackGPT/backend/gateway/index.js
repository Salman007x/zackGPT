import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import authmiddleware from './middlewares/auth.middleware.js';
import getCurrentUser from './controllers/user.controller.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use('/auth', proxy(process.env.AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => req.originalUrl,
}));

app.use('/me', authmiddleware, getCurrentUser);

app.get('/', (req, res) => {
  res.send('Hello from ZackGPT Gateway! , i am running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`ZackGPT Gateway is running on port ${PORT}`);
});



