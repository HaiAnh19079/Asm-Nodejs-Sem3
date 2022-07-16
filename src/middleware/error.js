import ErrorHandler from '../utils/errorhandler'

exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Enternal Server Error'

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    })
}
