import User from '../models/User.js'
import ErrorHandler from '../utils/errorhandler.js'

class UserController {
    //[GET] /api/users/
    async getAllUsers(req, res, next) {
        const limit = parseInt(req.query.limit || 5)
        const page = parseInt(req.query.page || 1)
        const skip = limit * (page - 1)
        const today = new Date()
        const expirationDate = new Date(today)
        expirationDate.setDate(today.getDate() + 1)
        const searchQuery = req.query.name
            ? {
                  name: {
                      $regex: req.query.name,
                      $options: 'i',
                  },
              }
            : {}
        console.log('searchQuery:', searchQuery)
        console.log(req.query)
        console.log(parseInt(expirationDate.getTime() / 1000, 10))
        const users = await User.find(searchQuery).limit(limit).skip(skip)
        const totalDocuments = await User.countDocuments()
        const totalPage = Math.ceil(totalDocuments / limit)
        res.status(200).json({
            success: true,
            users,
            data: {
                page,
                limit,
                totalDocuments,
                totalPage,
            },
        })
    }

    // [GET] /api/users/me --> User
    async getUserById(req, res, next) {
        let user = req.user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found !!',
            })
        }
        res.status(200).json({
            success: true,
            user,
        })
    }

    // [GET] /api/users/{id} --> Admin
    async getUserByIdAd(req, res, next) {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.

            let user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'user not found !!',
                })
            }
            res.status(200).json({
                success: true,
                user,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'userId is not valid... !!',
            })
        }
    }

    // [PUT] /api/users/{id}/update --> Admin
    async updateUserByIdAdmin(req, res, next) {
        const update = req.body
        const id = req.params.id
        const userId = req.user.id
        console.log('update request:', req.user)
        if (!userId) return next(new ErrorHandler('Please Login!!!', 401))

        const user = await User.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        console.log('user updated:', user)

        res.status(200).json({
            success: true,
            message: 'User has been updated',
            user,
        })
    }

    // [PUT] /api/users/me/update
    async updateUserByIdUser(req, res, next) {
        const update = req.body
        console.log('update request:', req.user)
        const userId = req.user.id
        console.log(userId)
        if (!userId) return next(new ErrorHandler('Please Login!!!', 401))

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: update },
            { new: true }
        )

        console.log('user updated:', user)

        res.status(200).json({
            success: true,
            message: 'User has been updated',
            user,
        })
    }

    // [DELETE] /api/users/{id}
    async destroyUserById(req, res, next) {
        const id = req.params.id

        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'User has been deleted',
            user,
        })
    }
}
export default new UserController;
