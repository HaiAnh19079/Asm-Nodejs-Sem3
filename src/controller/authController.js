const ErrorHandler = require('../utils/errorhandler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
class AuthController {
    //[POST] /api/auth/register
    register = async (req, res, next) => {
        const { name, email, password, avatar } = req.body

        if (!(email && password && name)) {
            return next(new ErrorHandler('Please enter required input', 400))
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return next(
                new ErrorHandler('User Already Exist. Please Login', 401)
            )
        }
        const user = await User.create({
            name,
            email,
            password,
            avatar,
        })
        const token = user.generateJWT()
        user.token = token

        res.status(201).json({
            success: true,
            user,
        })
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
        res.status(200).cookie('token', token, options).json({
            success: true,
            user,
        })
    }

    // [GET] /api/users/logout
    async logout(req, res, next) {
        // const user = req.user;
        // const user = await User.findOne({ id: req.user.id });
        // console.log("user logout:", user);
        // console.log("token:", req.token)
        // req.token = null;
        // console.log("token:", req.token)
        // res.cookie('token', null, {
        //     expiresIn: new Date(Date.now()),
        //     httpOnly: true,
        // });
        // res.status(200).json({
        //     success: true,
        //     message: "Logged Out",
        // });
    }
}
export default new AuthController()
