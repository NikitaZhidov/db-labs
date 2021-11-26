import { baseAxios } from './baseAxios';

export const sportApi = {
  async getAllJudges() {
    const response = await baseAxios.get('/sport/judge');
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body.judges;
  },

  async getAllSportsmans() {
    const response = await baseAxios.get('/sport/sportsman');
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body.sportsmans;
  },

  async getAllSportsmansWithRating() {
    const response = await baseAxios.get('/sport/sportsman-rating');
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body.sportsmans;
  },

  async addPointsToSpotsman(judge, sportsman, points) {
    const response = await baseAxios.post('/sport/sportsman-rating', {
      judge,
      sportsman,
      points,
    });
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body;
  },
};
