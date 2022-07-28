import Product from '../models/Product.js'
import User from '../models/User.js'
import Cart from '../models/Cart.js'
import Order from '../models/Order.js'
import ApiFeature from '../utils/apiFeature.js'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
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
        req.session.products = MultipleMongooseToObject(products)
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
        req.session.user = req.user

        res.redirect('back')
    }

    //[POST] /cart/edit
    async editProductCart(req, res, next) {
        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            next(new Error('Cart not found'))
        }
        let { itemId, productId, quantityValue, sizeEdit, colorEdit } = req.body
        console.log('itemId', itemId)
        const updateCartItems = [...cart.items]
        const productIndex = updateCartItems.findIndex(item => {
            console.log('item._id', item._id)
            if (
                item._id.toString() === itemId.toString() &&
                item.itemId.toString() === productId.toString()
            ) {
                return item
            }
        })
        console.log(productIndex)
        if (productIndex >= 0) {
            let quantityItem = (updateCartItems[productIndex].quantity =
                quantityValue)
            let priceItem = updateCartItems[productIndex].item.price
            updateCartItems[productIndex].price = priceItem * quantityItem
            updateCartItems[productIndex].size = sizeEdit
            updateCartItems[productIndex].color = colorEdit

            cart.items = updateCartItems
            cart.totalPrice = cart.items
                .map(p => p.price)
                .reduce((a, b) => a + b, 0)
            cart.totalQty = cart.items
                .map(p => p.quantity)
                .reduce((a, b) => a + b, 0)
            await cart.save()
        } else {
            next(new Error('product not found!'))
        }

        // let cartItems = [...cart.items]

        req.session.cart = MongooseToObject(cart)
        req.session.products = MultipleMongooseToObject(cart.generateArray())
        req.session.user = req.user

        res.json(cart)
    }

    async removeItemCart(req, res, next) {
        const item_id = req.body.id
        console.log('id',item_id);
        
        let cart = await Cart.findOne({ user: req.user._id })
        const cartItems = [...cart.items]
        const newCartItems = cartItems.filter(item => {
            return item._id.toString() !== item_id.toString()
        })
        cart.items = newCartItems
        cart.totalPrice = cart.items
            .map(p => p.price)
            .reduce((a, b) => a + b, 0)
        cart.totalQty = cart.items
            .map(p => p.quantity)
            .reduce((a, b) => a + b, 0)
        await cart.save()
        req.session.cart = MongooseToObject(cart)
        req.session.products = MultipleMongooseToObject(cart.generateArray())
        req.session.user = req.user
        res.redirect('back')
    }

    async getCheckout(req, res, next){
        const user = await User.findById(req.user._id)
        const cart = await Cart.findOne({ user: req.user._id })
        req.session.cart = MongooseToObject(cart)
        
        res.render('client/checkout',{
            user:MongooseToObject(user),
            cart:MongooseToObject(cart),
            products: MultipleMongooseToObject(cart.generateArray()),
        })
    }
    async createOrder(req, res, next){
        const {email,address,phoneNumber} = req.body

        const newOrder = {};
        const user = await User.findById(req.user._id);
        const cart = await Cart.findOne({ user: req.user._id });
        newOrder.itemsPrice = cart.totalPrice
        newOrder.totalPrice = cart.totalPrice
        newOrder.user = user._id
        newOrder.email = email
        newOrder.address = address
        newOrder.phoneNumber = phoneNumber
        newOrder.cart = cart
        await Order.create(newOrder);
        cart.items =[]
        cart.totalPrice = 0;
        cart.totalQty = 0
        await cart.save();
        res.redirect('/')

    }
}

export default new CartController()
