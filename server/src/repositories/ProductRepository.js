import { ProductModel } from '../models/product.js';
import { getRandomColor } from '../utils/color-utils.js';

class ProductRepository {
  async createProduct(product) {
    const createdProduct = new ProductModel({
      name: product.name,
      producer: product.producer,
      price: product.price,
      specialProperties: product.specialProperties,
      category: product.category,
      color: getRandomColor(),
      buyers: [],
    });

    await createdProduct.save();
  }

  async addBuyer(productId, buyer) {
    const product = await ProductModel.findById(productId);
    product.buyers.push(buyer);
    await product.save();
  }

  async getBuyers(productId) {
    const product = await ProductModel.findById(productId);
    return product.buyers;
  }

  async getAll(category) {
    if (category) {
      const products = await ProductModel.find({ category });
      return products;
    } else {
      const products = await ProductModel.find({});
      return products;
    }
  }

  async getProductTitles(category) {
    const titles = await ProductModel.find({ category }).select({ name: 1 });
    return titles;
  }

  async getProductProperties(category) {
    const properties = await ProductModel.find({ category }).select({
      specialProperties: 1,
    });

    return properties;
  }

  async getProductPrices(userName) {
    const prices = await ProductModel.find({
      'buyers.name': userName,
    }).select({
      name: 1,
      price: 1,
    });

    return prices;
  }

  async getAllColors() {
    const colors = await ProductModel.find({}).select({ color: 1 });
    return colors.map((c) => c.color);
  }

  async getByColor(color) {
    const products = await ProductModel.find({ color }).select({
      name: 1,
      producer: 1,
      price: 1,
    });
    return products;
  }

  async getGeneralSum() {
    const sumObj = await ProductModel.aggregate([
      {
        $unwind: '$buyers',
      },
      {
        $group: {
          _id: null,
          sum: { $sum: '$price' },
        },
      },
    ]);

    return sumObj[0].sum;
  }
}

export default new ProductRepository();
