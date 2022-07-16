import Product from '../models/Product.js'
import ErrorHandler from '../utils/errorhandler.js'
import ApiFeature from '../utils/apiFeature.js'
import {MultipleMongooseToObject, MongooseToObject} from '../utils/mongoose.js'
class ProductController {

    //[GET] /products
    async index(req, res, next) {
        // Product.find({})
        //     .then(products => {

        //         // var category = products.map(product => {
        //         //     var [a, ...rest] = product.category
        //         //     return a.toLowerCase()
        //         // })
        //         res.render('client/products/products'
        //         // , {
        //         //     products: multipleMongooseToObject(products),
        //         //     // category: category
        //         // }
        //         );
        //     })
        //     .catch(next);
        try {
            const products = await Product.find();
            if (!products) {
                res.json({ 
                    msg:'no products in db!'
                })
            }

            res.render('client/products/products',{
                products:MultipleMongooseToObject(products),
            })
        } catch (e) {
            res.json({ error: e });
        }
    }

    //[POST]/products modal
    GetProductQuickView(req, res, next) {

        var data_id = req.body.id
        console.log(data_id)
        Product.findById(data_id)
            .then(product => {
                console.log(product)
                res.json(product)
            })
            .catch(next);

    }


    // [POST] api/products/new
    async createProduct(req, res, next) {
        req.body.user = req.user.id
        console.log(req.body.user);
        console.log(req.body.file);
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product,
        })
    }

    // [GET] api/products/
    async getAllProducts(req, res, next) {
        const productDeletedCount = await Product.countDocumentsDeleted()
        // const limit = parseInt(req.query.limit || 5);
        // const page = parseInt(req.query.page || 1);
        // const skip = limit * (page - 1);

        // const searchQuery = req.query.keyword ? {
        //     name: {
        //         $regex: req.query.keyword,
        //         $options: "i"
        //     }
        // } : {};
        // console.log("searchQuery:", searchQuery);
        // console.log(req.query)
        // const products = await Product.find(searchQuery)
        //     .limit(limit)
        //     .skip(skip)
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
        console.log("products =>",products)
        const totalDocuments = await Product.countDocuments()
        // const totalPage = Math.ceil(totalDocuments / limit);
        res.render('client/products/products',{
            products: MultipleMongooseToObject(products)
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
        
        res.render('client/products/products',{
            product:MongooseToObject(product)
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

    // [DELETE] api/products/:id/soft
    softDelete = async (req, res, next) => {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!',
            })
        }
        await product.delete({ _id: req.params.id })

        res.status(200).json({
            success: true,
            message: 'Product (soft) deleted successfully',
            product,
        })
    }

    // [DELETE] api/products/trashes/:id/force
    forceDelete = async (req, res, next) => {
        let product = await Product.findOneDeleted({ _id: req.params.id })
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found (force destroy)',
            })
        }
        const productDeleteCount = await Product.deleteOne({
            _id: req.params.id,
        })

        res.status(200).json({
            success: true,
            product,
            productDeleteCount,
            message: 'Product destroyed successfully',
        })
    }

    //[GET] api/products/trashes
    getTrashProduct = async (req, res, next) => {
        const limit = parseInt(req.query.limit || 5)
        const page = parseInt(req.query.page || 1)
        const skip = limit * (page - 1)

        const searchQuery = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {}
        console.log('searchQuery:', searchQuery)

        const productsDelete = await Product.findDeleted(searchQuery)
            .limit(limit)
            .skip(skip)

        if (!productsDelete || productsDelete.length === 0) {
            res.status(500).json({
                success: true,
                message: 'No products have been deleted!!!',
            })
        }
        const totalDocuments = productsDelete.length
        const totalPage = Math.ceil(totalDocuments / limit)

        res.status(200).json({
            success: true,
            productsDelete,
            data: {
                page,
                limit,
                totalDocuments,
                totalPage,
            },
        })
    }

    // [PATCH] api/products/:id/restore
    restoreProduct = async (req, res, next) => {
        const product = await Product.findOneDeleted({ _id: req.params.id })
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found (restore)',
            })
        }
        console.log(product)

        await Product.restore({ _id: req.params.id })

        res.status(200).json({
            success: true,
            message: 'this product before restore was successful',
            product,
        })
    }
}

export default new ProductController
