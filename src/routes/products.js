import express from 'express';
const router = express.Router();

import productController from '../controller/ProductController.js';

router.get('/', productController.getAllProducts);
router.post('/', productController.GetProductQuickView);
router.get('/:id', productController.getProductById);

export default router;