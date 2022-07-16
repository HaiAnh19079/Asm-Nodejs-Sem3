import express from 'express';
const router = express.Router();
import path from 'path';
import multer from 'multer';
var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'src/public/dataimg');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

import adminController from '../controller/AdminController.js';

router.get('/', adminController.index);
router.get('/create', adminController.createProduct);
router.post('/create', upload.array('images',3), adminController.saveCreate);
router.get('/:id/edit', adminController.editProduct);
router.put('/:id', upload.array('imageupdate',3), adminController.saveUpdate);

export default router;