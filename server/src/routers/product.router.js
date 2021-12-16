import { Router } from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

router.get('/bycolor/:color', productController.getByColor);
router.get('/color', productController.getAllColors);
router.get('/sum', productController.getGeneralSum);

router.get('/', productController.getAll);
router.get('/:category', productController.getAll);
router.post('/', productController.addProduct);
router.get('/buyer/:productId', productController.getBuyers);
router.post('/buyer/:productId', productController.addBuyer);

router.get('/title/:category', productController.getProductTitles);
router.get('/property/:category', productController.getProductProperties);
router.get('/price/:userName', productController.getProductPrices);

export default router;
