import express from 'express';
const router = express.Router();
import {sessionCheck} from '../middleware/authenticate.js'

import siteController from '../controller/SiteController.js';

router.get('/', siteController.index);

export default router;