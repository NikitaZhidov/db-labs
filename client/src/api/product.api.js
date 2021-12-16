import { baseAxios } from './baseAxios';

export const productApi = {
  async createProduct(product) {
    try {
      await baseAxios.post('/product', { product });
    } catch (error) {
      throw new Error(error);
    }
  },

  async addBuyer(productId, buyer) {
    try {
      await baseAxios.post(`/product/buyer/${productId}`, { buyer });
    } catch (error) {
      throw new Error(error);
    }
  },

  async getAll(category) {
    try {
      const url = '/product' + (category || '');
      const res = await baseAxios.get(url);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getBuyers(productId) {
    try {
      const res = await baseAxios.get(`/product/buyer/${productId}`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getProductTitles(category) {
    try {
      const res = await baseAxios.get(`/product/title/${category}`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getProductProperties(category) {
    try {
      const res = await baseAxios.get(`/product/property/${category}`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getProductPrices(userName) {
    try {
      const res = await baseAxios.get(`/product/price/${userName}`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getAllColors() {
    try {
      const res = await baseAxios.get(`/product/color`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getProductsByColor(color) {
    try {
      const res = await baseAxios.get(`/product/bycolor/${color.slice(1)}`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getGeneralSum() {
    try {
      const res = await baseAxios.get(`/product/sum`);
      return res.data.body;
    } catch (error) {
      throw new Error(error);
    }
  },
};
