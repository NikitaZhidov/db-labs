import { ApiResponse } from '../api-response/api-response.js';
import productRepository from '../repositories/ProductRepository.js';

class ProductController {
  async addProduct(req, res) {
    try {
      const { product } = req.body;

      await productRepository.createProduct(product);

      return res.status(200).json(new ApiResponse(200));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async addBuyer(req, res) {
    try {
      const { buyer } = req.body;
      const { productId } = req.params;

      await productRepository.addBuyer(productId, buyer);

      return res.status(200).json(new ApiResponse(200));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getAll(req, res) {
    try {
      const { category } = req.params;

      const products = await productRepository.getAll(category);

      return res.status(200).json(new ApiResponse(200, products));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getBuyers(req, res) {
    try {
      const { productId } = req.params;

      const buyers = await productRepository.getBuyers(productId);

      return res.status(200).json(new ApiResponse(200, buyers));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getProductTitles(req, res) {
    try {
      const { category } = req.params;

      const titles = await productRepository.getProductTitles(category);

      return res.status(200).json(new ApiResponse(200, titles));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getProductProperties(req, res) {
    try {
      const { category } = req.params;

      const titles = await productRepository.getProductProperties(category);

      return res.status(200).json(new ApiResponse(200, titles));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getProductPrices(req, res) {
    try {
      const { userName } = req.params;

      const prices = await productRepository.getProductPrices(userName);

      return res.status(200).json(new ApiResponse(200, prices));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getAllColors(req, res) {
    try {
      const colors = await productRepository.getAllColors();

      return res.status(200).json(new ApiResponse(200, colors));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getByColor(req, res) {
    try {
      const { color } = req.params;

      const products = await productRepository.getByColor('#' + color);

      return res.status(200).json(new ApiResponse(200, products));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }

  async getGeneralSum(req, res) {
    try {
      const sum = await productRepository.getGeneralSum();
      return res.status(200).json(new ApiResponse(200, sum));
    } catch (e) {
      console.log(e);
      return res.status(500).json(ApiResponse.InternalError());
    }
  }
}

export default new ProductController();
