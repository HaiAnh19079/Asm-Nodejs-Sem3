import productsRouter from './product.js'

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    app.use('/products', productsRouter)
}
export default route
