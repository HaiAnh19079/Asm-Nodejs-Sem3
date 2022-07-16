import express from 'express';
const router = express.Router();

import siteController from '../controller/SiteController.js';

router.get('/', siteController.index);

export default router;