import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use('/auth', proxy(process.env.AUTH_SERVICE_URL, {
  proxyReqPathResolver: (req) => req.originalUrl,
}));

app.get('/', (req, res) => {
  res.send('Hello from ZackGPT Gateway! , i am running on port ' + PORT);
});

app.listen(PORT, () => {
  console.log(`ZackGPT Gateway is running on port ${PORT}`);
});



