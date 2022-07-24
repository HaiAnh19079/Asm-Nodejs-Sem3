import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import ApiFeature from '../utils/apiFeature.js'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
class CartController {
    //[GET] /products
    async getShoppingCart(req, res, next) {
        if (!req.cookies.token) {
            res.status(404).json({
                message: 'Please Login!!!',
            })
        } else {
            const userId = req.user._id
            console.log(userId)
            // let cart = new Cart(req.session.cart ? req.session.cart : {})
            // let cartTotalQty = cart.totalQty
            // let cartTotalPrice = cart.totalPrice
            // const products = cart.generateArray()
            // console.log('products',products)

            res.render('client/users/cart', {
                // cartTotalQty,
                // cartTotalPrice,
                // products: products,
            })
        }
    }

    //[POST] /cart/add/:id
    async addToCart(req, res, next) {
        const productId = req.params.id
        let { qty, size, color } = req.body
        let qtyInt = parseInt(qty, 10)
        console.log('qtyInt', qtyInt)
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        if (req.session.user) {
            cart.user = req.session.user._id
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.redirect('back')
        }

        cart.add(product, product.id, qtyInt, size, color)
        req.session.cart = cart
        console.log(req.session.cart)
        // console.log(req.session.cart.items[product.id].item)
        // req.sessionback ? req.session.products :[]
        req.session.products = cart.generateArray()
        console.log(req.session.products)

        res.redirect('/products')
    }
}

export default new CartController()
