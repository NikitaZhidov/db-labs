import express from 'express';
import cors from 'cors';
import { ApiResponse } from './src/api-response/api-response.js';
import { RedisClient } from './src/db-instances/redis.js';
import fontRouter from './src/routers/font.router.js';
import sportRouter from './src/routers/sport.router.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/font', fontRouter);
app.use('/api/sport', sportRouter);

app.use('/api/*', (req, res) => {
  res.status(404).json(new ApiResponse(404));
});

app.listen(PORT, async () => {
  await connectToDatabases();
  console.log(`Server listen ${PORT} port...`);
});

const connectToDatabases = async () => {
  try {
    await RedisClient.connect();
    RedisClient.on('error', (err) => console.log('Redis Client Error', err));
  } catch (error) {
    console.error('Redis connection error', error);
  }
};
