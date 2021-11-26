import { RedisClient } from '../db-instances/redis.js';

class SportRatingRepository {
  async getAllJudges() {
    // judge-sportsman key pattern: '<judge>:<sportsman>:points'
    const judgesKeys = await RedisClient.keys('*:*:points');
    const setJudges = new Set(judgesKeys.map((key) => key.split(':')[0]));
    return Array.from(setJudges);
  }

  async getAllSportsmans() {
    // judge-sportsman key pattern: '<judge>:<sportsman>:points'
    const sportsmansKeys = await RedisClient.keys('*:*:points');
    const setSportsmans = new Set(
      sportsmansKeys.map((key) => key.split(':')[1])
    );
    return Array.from(setSportsmans);
  }

  async getAllSportsmansWithRating() {
    const sportsmansKeys = await RedisClient.keys('*:*:points');
    const sportsmansWithPoints = {};

    for (let i = 0; i < sportsmansKeys.length; i++) {
      const key = sportsmansKeys[i];

      const sportsmanName = key.split(':')[1];
      const sportsmanPoints = await RedisClient.get(key);

      if (!sportsmansWithPoints[sportsmanName]) {
        sportsmansWithPoints[sportsmanName] = +sportsmanPoints;
      } else {
        sportsmansWithPoints[sportsmanName] += +sportsmanPoints;
      }
    }

    return Object.entries(sportsmansWithPoints).map(([key, value]) => ({
      sportsman: key,
      points: value,
    }));
  }

  async addPointsToSportsman(judge, sportsman, points) {
    const key = `${judge}:${sportsman}:points`;
    const existingPoints = await RedisClient.get(key);
    if (existingPoints === null) {
      await RedisClient.set(key, points);
      return;
    }
    await RedisClient.incrBy(key, points);
  }
}

export default new SportRatingRepository();
