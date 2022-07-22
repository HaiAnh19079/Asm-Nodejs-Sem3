import express from 'express';
const router = express.Router();

import userController from '../controller/UserController.js';

router.get('/', userController.getAllProducts);
router.post('/', userController.GetProductQuickView);

export default router;