import ErrorHandler from '../utils/errorhandler.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage('./scratch');
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
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        }
        console.log('user->', user)
        localStorage.setItem('user', user);
        // localStorage.setItem(PLAYER_STRORAGE_KEY, JSON.stringify(this.config))
        // res.status(200).cookie('token', token, options)
        // .json({
        //     success: true,
        //     user,
        // })
        if(user){
            req.session.user = user
            
            res.redirect('/')
        }
        
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
        res.status(200).json({
            success: true,
            message: 'Logged Out',
        })
        res.redirect('/')
    }
}
export default new AuthController()
