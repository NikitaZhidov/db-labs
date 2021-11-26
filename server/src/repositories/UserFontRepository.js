import { RedisClient } from '../db-instances/redis.js';

class UserFontsRepository {
  async getAllUsers() {
    // user key pattern: 'user:<name>:font-settings'
    const users = await RedisClient.keys('user:*:font-settings');
    return users.map((userKey) => userKey.split(':')[1]);
  }

  async getUserFontSettings(userName) {
    const settings = await RedisClient.get(`user:${userName}:font-settings`);
    return JSON.parse(settings);
  }

  async createUser(userName, fontSettings) {
    const userKey = `user:${userName}:font-settings`;
    const userValue = JSON.stringify(fontSettings);

    await RedisClient.set(userKey, userValue);
  }

  async updateUser(userName, fontSettings) {
    const userKey = `user:${userName}:font-settings`;
    const userValue = JSON.stringify(fontSettings);

    await RedisClient.set(userKey, userValue);
  }
}

export default new UserFontsRepository();
