import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import ApiFeature from '../utils/apiFeature.js'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
class CartController {
    //[GET] /products
    // async index(req, res, next) {
    //     try {
    //         const products = await Product.find().limit(8)
    //         if (!products) {
    //             res.json({
    //                 msg: 'no products in db!',
    //             })
    //         }
    //         console.log(products)
    //         res.render('client/products/home', {
    //             products: MultipleMongooseToObject(products),
    //         })
    //     } catch (e) {
    //         res.json({ error: e })
    //     }
    // }

    // [POST] api/cart/add/:id
    async addToCart(req, res, next) {
        const productId = req.params.id
        let {qty,size,color} = req.body
        let qtyInt = parseInt(qty, 10)
        console.log('qtyInt',qtyInt)
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        if(req.session.user){
            cart.user = req.session.user._id;

        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.redirect('/products')
        }

        cart.add(product, product.id,qtyInt,size,color)
        req.session.cart = cart
        console.log(req.session.cart)
        // console.log(req.session.cart.items[product.id].item)
        // req.session.products ? req.session.products :[]
        req.session.products = cart.generateArray()
        console.log(req.session.products)

        res.redirect('/products')
    }

    
}

export default new CartController()
