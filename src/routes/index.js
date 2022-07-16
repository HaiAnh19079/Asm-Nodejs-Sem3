import productsRouter from './products.js';
import siteRouter from './site.js';
import adminRouter from './admin.js';

function route(app) {
    app.use('/admin', adminRouter)
    app.use('/products', productsRouter)
    app.use('/', siteRouter)
};
export default route;