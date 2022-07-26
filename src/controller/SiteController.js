import {
    verifyToken,
    verifyTokenUser,
    verifyTokenAndAuthorization,
    verifyTokenAdmin,
} from '../middleware/authenticate.js'
import {MultipleMongooseToObject,MongooseToObject} from '../utils/mongoose.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Cart from '../models/Cart.js'
class SiteController {
    //[GET] /
    async index(req, res, next) {
        if (req.cookies && req.cookies.token_user) {
            const authHeader = req.cookies.token_user
            console.log('auth', authHeader)
            if (authHeader) {
                const token = authHeader //.split(' ')[1]
                const data = jwt.verify(token, process.env.JWT_SECRET)

                req.user = await User.findById(data.id)
                console.log('req.user:', req.user)
                req.session.user = MongooseToObject(req.user)
                const cart = await Cart.findOne({user: req.user._id})
                if (cart) {
                    req.session.cart = MongooseToObject(cart)
                    req.session.products = MultipleMongooseToObject(cart.generateArray())
                }
            }
        }
        res.render('client/home')
    }
}
export default new SiteController()
