import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(data.id)
        req.token = token
        console.log('req.user:', req.user)
        console.log('token:', token)
        next()
    } else {
        return res.status(401).json({
            success: false,
            message: 'You are not authenticated!',
        })
    }
}
const sessionCheck = async (req, res, next) => {
    if (req.session.user ) {
        console.log('123456')
        next()
    } else {
        if(req.user){
            console.log('req.user',req.user)
        }
        console.log('else next');
        
        next()
    }
}
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not allowed to do that! Please login!',
            })
        }
    })
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                success: false,
                message: 'You are not allowed to do that! You must be Admin!',
            })
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin ,sessionCheck}
