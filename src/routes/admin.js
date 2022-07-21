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

//home
router.get('/', adminController.index);

//products
router.get('/products', adminController.getProducts);
router.get('/product/new', adminController.createProduct);
router.post('/product/new', upload.array('images'), adminController.saveCreate);
router.get('/product/:id/edit', adminController.editProduct);
router.post('/product/:id/edit', upload.array('imageupdate'), adminController.saveUpdate);

//category
router.get('/categories', categoryController.index);
router.get('/category/new', adminController.createCategory);
router.post('/category/new', adminController.saveCreateCat);


export default router;