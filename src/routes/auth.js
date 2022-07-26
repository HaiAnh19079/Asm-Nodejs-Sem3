import express from 'express';
const router = express.Router();

import authController from '../controller/AuthController.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,verifyTokenUser
}
 from '../middleware/authenticate.js'

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout',verifyToken, authController.logoutAd);
router.get('/logoutUser',verifyTokenUser, authController.logout);

export default router;