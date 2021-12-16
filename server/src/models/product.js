import mongoose from 'mongoose';

const productScheme = new mongoose.Schema({
  name: String,
  producer: String,
  price: Number,
  specialProperties: [String],
  category: String,
  color: String,
  buyers: [
    { name: String, date: Date, review: String, deliveryService: String },
  ],
});

export const ProductModel = mongoose.model('product', productScheme);
