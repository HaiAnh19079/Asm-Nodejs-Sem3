import productsRouter from './products.js';
import siteRouter from './site.js';
import adminRouter from './admin.js';
import authRouter from './auth.js';
import cartRouter from './cart.js';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
}
 from '../middleware/authenticate.js'

function route(app) {
    app.use('/admin', adminRouter)//verifyTokenAdmin
    app.use('/products', productsRouter)
    app.use('/cart', cartRouter)
    app.use('/auth', authRouter)
    app.use('/', siteRouter)
};
export default route;