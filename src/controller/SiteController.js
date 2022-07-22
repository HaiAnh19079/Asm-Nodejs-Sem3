import {MongooseToObject} from '../utils/mongoose.js'
class SiteController {
    //[GET] /
    index(req, res, next) {
        res.render('client/home')
    }
}

export default new SiteController()
