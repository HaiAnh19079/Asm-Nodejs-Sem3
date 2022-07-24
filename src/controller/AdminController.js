import Product from '../models/Product.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import Order from '../models/Order.js'
import path from 'path'
import {
    MultipleMongooseToObject,
    MongooseToObject,
} from '../utils/mongoose.js'
import { resolveNaptr } from 'dns/promises'

class AdminController {
    //[GET] /admin/home
    index = async (req, res, next) => {
        try {
            const totalProduct = await Product.countDocuments()
            const totalUser = await User.countDocuments()
            const totalCategory = await Category.countDocuments()
            const totalOrder = await Order.countDocuments()
            // if(){return}
            res.render('admin/home', {
                totalProduct,
                totalUser,
                totalCategory,
                totalOrder,
                layout: 'admin',
            })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    //[GET] /admin/
    getLoginPage = async (req, res, next) => {
        if(!req.cookies.token){
            res.render('admin/loginPage',{layout: 'loginAdmin'})
        }else{
            res.redirect('/admin/home')
        }

    }
    //[POST] admin/login 
    

    // [GET] admin/products
    getProducts = async (req, res, next) => {
        try {
            const products = await Product.find({}).sort({
                createdAt: 'descending',
            })
            if (!products) {
                res.status(401).json({ message: 'products not found' })
            }

            res.render('admin/products/products', {
                products: MultipleMongooseToObject(products),
                layout: 'admin',
            })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    //[GET] admin/product/new
    createProduct = async (req, res, next) => {
        const categories = await Category.find()
        // console.log('categories->',categories)
        res.render('admin/products/createProduct', {
            categories: MultipleMongooseToObject(categories),
            layout: 'admin',
        })
    }

    //[POST] admin/product/new
    saveCreate = async (req, res, next) => {
        const formdata = req.body
        const files = req.files
        const userId = '620a30d6fda27979ae0ef650'
        // console.log('file->', files)
        formdata.images = []
        let index = 0
        for (let file of files) {
            const element = {}
            element.url = file.path.replace('src\\public\\', '\\')
            element.index = index += 1
            formdata.images.push(element)
        }
        formdata.user = userId
        const product = new Product(formdata)

        await product.save()

        res.redirect('/admin')
    }

    //[GET] admin/category/new
    createCategory = async (req, res, next) => {
        res.render('admin/categories/createCategory', {
            layout: 'admin',
        })
    }

    //[POST] admin/category/new
    saveCreateCat = async (req, res, next) => {
        const formdata = req.body
        const category = new Category(formdata)
        await category.save()
        res.redirect('/admin/categories')
    }

    //[DELETE] admin/category/:id/del
    softDeleteCategory = async (req, res, next) => {
        let category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'category not found!',
            })
        }
        await category.delete({ _id: req.params.id })

        res.status(200).json({
            success: true,
            message: 'category (soft) deleted successfully',
            category,
        })
    }

    //[GET] admin/product/:id/edit
    editProduct = async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id)
            const categories = await Category.find()
            const catOfProduct = []
            const catNow = product.categories
            for (let cat of catNow) {
                let c = cat.toString()
                const category = await Category.findById(c)
                catOfProduct.push(category)
            }

            const genders = product.genders
            console.log(genders)

            let arrgenders = ['male', 'female']
            let genderNotSelected = arrgenders.filter(value => {
                return genders.every(v => !v.includes(value))
            })
            console.log('genderNotSelected:', genderNotSelected)

            let categoryNotSelected = categories.filter(value =>
                catOfProduct.every(v => !v.name.includes(value.name))
            )

            res.render('admin/products/editProduct', {
                product: MongooseToObject(product),
                catOfProduct: MultipleMongooseToObject(catOfProduct),
                categoryNotSelected:
                    MultipleMongooseToObject(categoryNotSelected),
                genderNotSelected: genderNotSelected,
                layout: 'admin',
            })
        } catch (e) {
            res.status(500).json({ message: e })
        }
    }

    editFile

    // [PUT] admin/products/:id
    saveUpdate = async (req, res, next) => {
        const data = req.body
        const indexs = req.body.index || ''
        const files = req.files
        const file = req.files[0]
        const product = await Product.findOne({ _id: req.params.id })
        data.images = [...product.images]
        const imagesInput = []
        const imagesEdit = []
        console.log('data->', data)
        console.log('indexs->', indexs)
        const index = Array.from(new Set(indexs))
        console.log('index->', index)
        if (Array.isArray(index)) {
            for (var i = 0; i < index.length; i++) {
                req.files[i].index = index[i]
            }
        } else {
            req.files[0].index = index
        }

        console.log('test:', req.files)

        for (let file of files) {
            const element = {}
            element.url = file.path.replace('src\\public\\', '\\')
            element.index = file.index
            imagesInput.push(element)
        }
        console.log('imagesInput', imagesInput)
        const imgDb = []
        data.images.forEach(function (img) {
            const element = {}
            element.url = img.url
            element.index = img.index
            imgDb.push(element)
        })
        console.log('imgDb', imgDb)
        for (let course of imgDb) {
            for (let newCourse of imagesInput) {
                if (course.index.includes(newCourse.index)) {
                    course.url = newCourse.url
                    imagesInput.shift(newCourse)
                }
            }
        }
        console.log('imgDb', imgDb)
        console.log('imagesInput', imagesInput)
        const e = [...imgDb, ...imagesInput]

        const set = Array.from(new Set(e))
        console.log('set', set)
        data.images = set
        await Product.updateOne({ _id: req.params.id }, data)

        res.redirect('/admin/products')
    }
}

export default new AdminController()
