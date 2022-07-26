import ErrorHandler from '../utils/errorhandler.js'
import Cart from '../models/Cart.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
class AuthController {
    //[POST] /api/auth/register
    register = async (req, res, next) => {
        let { email, password, avatar } = req.body

        if (!(email && password)) {
            return next(new ErrorHandler('Please enter required input', 400))
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return next(
                new ErrorHandler('User Already Exist. Please Login', 401)
            )
        }
        avatar = 'path image demo'
        const user = await User.create({
            email,
            password,
            avatar,
        })
        const token = user.generateJWT()
        user.token = token

        // res.status(201).json({
        //     success: true,
        //     user,
        // })
        res.redirect('/')
    }

    // [POST] /api/auth/login
    async login(req, res, next) {
        const { email, password } = req.body
        //checking if user has given password and email both
        // let passwordToStr = password;
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email & password', 400))
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'User email not found' })
        }

        const isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' })
        }
        const token = user.generateJWT()
        user.token = token

        // console.log('user->', user)

        console.log('cart', req.session.cart)

        if (user) {
            let cart = await Cart.findOne({ user: user._id })
            if(cart){

                req.session.cart = MongooseToObject(cart)
                req.session.products = MultipleMongooseToObject(cart.generateArray())
            }
           
            res.cookie('token_user', token, {
                httpOnly: true,
                maxAge: 3 * 60 * 60 * 1000,
            })
            req.user = user
            req.session.user = MongooseToObject(user)
            res.redirect('back')
            
        }
        // res.redirect('back')
    }

    // [GET] /api/users/logout
    async logout(req, res, next) {
        // const user = req.user;
        const user = await User.findOne({ id: req.user.id })
        console.log('user logout:', user)
        // req.user = null
        console.log('token:', req.token)
        
            req.session.user = null
            req.session.products = null
            req.session.cart = null
            res.clearCookie('token_user')
            res.redirect('/')
        // res.redirect('back')
    }
    async logoutAd(req, res, next) {
        // const user = req.user;
        const user = await User.findOne({ id: req.user.id })
        console.log('user logout:', user)
        // req.user = null
        console.log('token:', req.token)
        if(user._id.toString() === req.user._id.toString()){
            // req.user = null;
            // req.session.user = null;
            // req.session.cart = null;
            // req.session.products = null;
            // res.clearCookie('token_user')
        }
            req.session.adminAcc = null
            res.clearCookie('token')
            res.redirect('/')
        // res.redirect('back')
    }
}
export default new AuthController()
