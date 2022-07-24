import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyToken = async (req, res, next) => {
    // const authHeader = req.headers.authorization
    // const authHeaderW = req.headers['Authorization']
    const authHeader = req.cookies.token
    console.log('auth',authHeader);
    // console.log('auth1',authHeaderW);
    if (authHeader) {
        const token = authHeader//.split(' ')[1]
        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(data.id)
        req.token = token
        console.log('req.user:', req.user)
        console.log('token:', token)
        next()
    } else {
        // res.send(alert('You are not login'))
        // next()
        res.redirect('login')
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

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin }
