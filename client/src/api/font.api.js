import { baseAxios } from './baseAxios';

export const fontApi = {
  async getAllUsers() {
    const response = await baseAxios.get('/font/user');
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body.users;
  },

  async getUserFontSettings(userName) {
    const response = await baseAxios.get(`/font/user/${userName}`);
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body;
  },

  async updateFontSettings(userName, fontSettings) {
    const response = await baseAxios.patch(`/font/user/${userName}`, {
      fontSettings,
    });
    if (response.status !== 200) {
      throw new Error(response.data.errors[0]);
    }

    return response.data.body;
  },
};
