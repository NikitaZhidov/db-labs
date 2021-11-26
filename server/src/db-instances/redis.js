import { createClient } from 'redis';
import { RedisDBConfig } from '../config/db.js';

export const RedisClient = createClient({
  url: RedisDBConfig.connectionString,
});
