import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyTokenUser = async (req, res, next) => {
    // const authHeader = req.headers.authorization
    if(!req.cookies.token_user) return res.redirect('back');
    const authHeader = req.cookies.token_user
    console.log('auth',authHeader);
    if (authHeader) {
        const token = authHeader//.split(' ')[1]
        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(data.id)
        req.token = token
        console.log('req.user:', req.user)
        console.log('token:', token)
        next()
    } else {
        // next()
        res.redirect('back')
        return res.status(401).json({
            success: false,
            message: 'You are not authenticated!',
        })
    }
}

const verifyToken = async (req, res, next) => {
    // const authHeader = req.headers.authorization
    if(!req.cookies.token) return res.redirect('/admin/');
    const authHeader = req.cookies.token
    console.log('auth',authHeader);
    if (authHeader) {
        const token = authHeader//.split(' ')[1]
        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(data.id)
        req.token = token
        console.log('req.user:', req.user)
        console.log('token:', token)
        next()
    } else {
        // next()
        res.redirect('/admin/')
        return res.status(401).json({
            success: false,
            message: 'You are not authenticated!',
        })
    }
}




const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next()
        } else {

            res.redirect('back')
            // res.status(401).json({
            //     success: false,
            //     message: 'You are not allowed to do that! Please login!',
            // })
        }
    })
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user?.role === 'admin') {
            console.log(123);
            
            next()
        } else {
            // res.status(401).json({
            //     success: false,
            //     message: 'You are not allowed to do that! You must be Admin!',
            // })
            res.redirect('back')
        }
    })
}

export { verifyToken,verifyTokenUser, verifyTokenAndAuthorization, verifyTokenAdmin }
