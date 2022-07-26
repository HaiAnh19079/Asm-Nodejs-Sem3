import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import ApiFeature from '../utils/apiFeature.js'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
import e from 'express'
class CartController {
    //[GET] /products
    async getShoppingCart(req, res, next) {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            return res.render('client/users/cart', {})
        }
        let cartTotalQty = cart.totalQty
        let cartTotalPrice = cart.totalPrice
        const products = cart.generateArray()
        req.session.cart = MongooseToObject(cart)
        console.log('req.session.cart', req.session.cart)
        req.session.user = MongooseToObject(req.user)

        res.render('client/users/cart', {
            cartTotalQty,
            cartTotalPrice,
            products: MultipleMongooseToObject(products),
        })
    }

    //[POST] /cart/add/:id
    async addToCart(req, res, next) {
        const productId = req.params.id
        let { qty, price, size, color } = req.body
        let qtyInt = parseInt(qty, 10)
        let cart = await Cart.findOne({ user: req.user._id })
        const product = await Product.findById(productId)
        const priceItem = product.price
        let priceProItem = priceItem * qtyInt
        if (!cart) {
            let newCart = {}
            const storedItem = {
                itemId: productId,
                item: product,
                quantity: qtyInt,
                price: priceProItem,
                size: size,
                color: color,
            }
            newCart.user = req.user._id
            newCart.items = []
            newCart.items.push(storedItem)
            newCart.totalQty = storedItem.quantity
            newCart.totalPrice = storedItem.price
            console.log('newCart->', newCart)
            cart = await Cart.create(newCart)
        } else {
            const storedItem = {
                itemId: productId,
                item: product,
                quantity: qtyInt,
                price: priceProItem,
                size: size,
                color: color,
            }
            const updatedCartItems = [...cart.items]
            const pro = updatedCartItems.findIndex(item => {
                if (
                    item.itemId.toString() === storedItem.itemId.toString() &&
                    item.size === storedItem.size &&
                    item.color === storedItem.color
                ) {
                    return item
                }
            })
            console.log('proIndex', pro)
            if (pro >= 0) {
                updatedCartItems[pro].quantity += storedItem.quantity
                updatedCartItems[pro].price += storedItem.price
            } else {
                updatedCartItems.push(storedItem)
            }

            cart.items = updatedCartItems
            cart.totalPrice = cart.items
                .map(p => p.price)
                .reduce((a, b) => a + b, 0)
            cart.totalQty = cart.items
                .map(p => p.quantity)
                .reduce((a, b) => a + b, 0)
            await cart.save()
        }
        req.session.cart = MongooseToObject(cart)
        req.session.products = MultipleMongooseToObject(cart.generateArray())

        res.redirect('back')
    }
}

export default new CartController()
