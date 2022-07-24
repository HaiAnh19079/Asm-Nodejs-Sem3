import express from 'express';
const router = express.Router();
import path from 'path';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'src/public/dataimg');
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() + path.extname(file.originalname));
    },
    index : function(req, file, cb) {
        console.log(req.file)
    }
});
const upload = multer({ storage: storage });

import adminController from '../controller/AdminController.js';
import categoryController from '../controller/CategoryController.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
}
 from '../middleware/authenticate.js'
//home
router.get('/', adminController.getLoginPage);
router.get('/home', adminController.index);

//products
router.get('/products',verifyTokenAdmin, adminController.getProducts);
router.get('/product/new',verifyTokenAdmin, adminController.createProduct);
router.post('/product/new',verifyTokenAdmin, upload.array('images'), adminController.saveCreate);
router.get('/product/:id/edit',verifyTokenAdmin, adminController.editProduct);
router.post('/product/:id/edit',verifyTokenAdmin, upload.array('imageupdate'), adminController.saveUpdate);

//category
router.get('/categories',verifyTokenAdmin, categoryController.index);
router.get('/category/new',verifyTokenAdmin, adminController.createCategory);
router.post('/category/new',verifyTokenAdmin, adminController.saveCreateCat);


export default router;