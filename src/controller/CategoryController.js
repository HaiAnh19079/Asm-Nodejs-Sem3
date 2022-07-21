import Category from '../models/Category.js'
import ApiFeature from '../utils/apiFeature.js'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
class CategoryController {
    //[GET] /categories
    async index(req, res, next) {
        try {
            const categories = await Category.find()
            if (!categories) {
                res.json({
                    msg: 'no categories in db!',
                })
            }
            res.render('admin/categories', {
                categories: MultipleMongooseToObject(categories),
                layout: 'admin',
            })
        } catch (e) {
            res.json({ error: e })
        }
    }
    

    // [POST] api/category/new
    async createProduct(req, res, next) {
        req.body.user = req.user.id
        console.log(req.body.user)
        const product = await Product.create(req.body)
        product.save()
        res.status(201).json({
            success: true,
            product,
        })
    }

    // [GET] api/categories/
    async getAllProducts(req, res, next) {
        const productDeletedCount = await Product.countDocumentsDeleted()
        const apiFeature = new ApiFeature(Product.find(), req.query)
            .search()
            .filter()
        // .pagination(3)
        // console.log('apiFeature.query:', apiFeature.query)
        let products = await apiFeature.query
        if (typeof products === 'Array' && products.length === 0) {
            res.status(200).json({
                success: false,
                products,
                productDeletedCount,
                message: 'All products have been soft deleted',
            })
        }
        console.log('products =>', products)
        const totalDocuments = await Product.countDocuments()
        // const totalPage = Math.ceil(totalDocuments / limit);
        res.render('client/products/products', {
            products: MultipleMongooseToObject(products),
        })
        // res.status(200).json({
        //     success: true,
        //     productDeletedCount,
        //     products,
        //     // data: {
        //     //     page,
        //     //     limit,
        //     //     totalDocuments,
        //     //     totalPage,
        //     // }
        // })
    }

    // [GET] api/products/:id
    getProductById = async (req, res, next) => {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found !!',
            })
        }

        res.render('client/products/products', {
            product: MongooseToObject(product),
        })
        // res.status(200).json({
        //     success: true,
        //     product,
        // })
    }

    // [PUT] api/products/:id/update --> admin
    updateProduct = async (req, res, next) => {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found!',
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        res.status(200).json({
            success: true,
            product,
        })
    }
}

export default new CategoryController()
