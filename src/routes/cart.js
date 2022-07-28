import express from 'express';
const router = express.Router();

import cartController from '../controller/CartController.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
    verifyTokenUser,
}
 from '../middleware/authenticate.js'
router.get('/',verifyTokenUser, cartController.getShoppingCart);
router.get('/checkout',verifyTokenUser, cartController.getCheckout);
router.post('/checkout',verifyTokenUser, cartController.createOrder);
router.post('/',verifyTokenUser, cartController.editProductCart);
router.post('/remove',verifyTokenUser, cartController.removeItemCart);
router.post('/add/:id',verifyTokenUser, cartController.addToCart);
// router.post('/register', cartController.register);

export default router;