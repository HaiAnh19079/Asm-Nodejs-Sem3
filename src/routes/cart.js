import express from 'express';
const router = express.Router();

import cartController from '../controller/CartController.js';

router.post('/add/:id', cartController.addToCart);
// router.post('/register', cartController.register);

export default router;