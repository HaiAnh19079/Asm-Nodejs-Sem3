import productsRouter from './products.js';
import siteRouter from './site.js';
import adminRouter from './admin.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
}
 from '../middleware/authenticate.js'

function route(app) {
    app.use('/admin', adminRouter)//verifyTokenAdmin
    app.use('/products', productsRouter)
    app.use('/', siteRouter)
};
export default route;