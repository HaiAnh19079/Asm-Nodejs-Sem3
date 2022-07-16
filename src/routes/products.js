import express from 'express';
const router = express.Router();

import productsController from '../controller/ProductController.js';

router.get('/', productsController.getAllProducts);
router.post('/', productsController.GetProductQuickView);

export default router;