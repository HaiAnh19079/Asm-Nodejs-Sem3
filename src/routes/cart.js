import express from 'express';
const router = express.Router();

import cartController from '../controller/CartController.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
}
 from '../middleware/authenticate.js'
router.get('/',verifyToken, cartController.getShoppingCart);
router.post('/add/:id', cartController.addToCart);
// router.post('/register', cartController.register);

export default router;