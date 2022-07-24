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
            return next(new ErrorHandler('Invalid email or password', 401))
        }

        const isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401))
        }
        const token = user.generateJWT()
        user.token = token

        // console.log('user->', user)
        // res.status(200).cookie('token', token, options)
        // .json({
        //     success: true,
        //     user,
        // })
        console.log('cart', req.session.cart)

        if (user) {
            // req.session.user = user
            if (req.session.cart) {
                let cartUser = { ...req.session.cart }
                cartUser.user = user._id
                const cart = new Cart(cartUser)
                console.log('cartU', cart)
            }
             res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3 * 60 * 60*1000,
            })
            if (user.role === 'admin') {
                console.log(user.role)

                res.redirect('/admin/home')
            }
            if (user.role === 'user') {
                console.log(user.role)

                res.redirect('back')
            }
        }
        // res.redirect('back')
    }

    // [GET] /api/users/logout
    async logout(req, res, next) {
        // const user = req.user;
        const user = await User.findOne({ id: req.user.id })
        console.log('user logout:', user)
        console.log('token:', req.token)
        req.token = null
        req.headers.authorization = null
        req.user = null
        console.log('token:', req.token)
        res.cookie('token', null, {
            expiresIn: new Date(Date.now()),
            httpOnly: true,
        })
        // res.status(200).json({
        //     success: true,
        //     message: 'Logged Out',
        // })
        res.redirect('/')
    }
}
export default new AuthController()
