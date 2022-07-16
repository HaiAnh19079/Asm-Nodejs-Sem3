import Product from '../models/Product.js'
import path from 'path'
import { MultipleMongooseToObject, MongooseToObject } from '../utils/mongoose.js'

class AdminController {

    //[GET] /admin/
    index(req, res, next) {
        Product.find({})
            .sort({ 'createdAt': "descending" })
            .then(products => {
                res.render('admin/home', {
                    products: MultipleMongooseToObject(products),
                    layout: 'admin'
                });
            })
            .catch(next)
    }

    //[GET] admin/create
    createProduct(req, res, next) {
        res.render('admin/createProduct', { layout: 'admin' });
    }

    //[POST] admin/create
    saveCreate(req, res, next) {
        var formdata = req.body;
        const file = req.file;

        formdata.image = req.file.path.replace('src\\public\\', '\\')
        const product = new Product(formdata);
        product.save();
        res.redirect('/admin')
    }

    //[GET] admin/:id/edit
    editProduct(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                var colors = product.color
                var sizes = product.size
                var genders = product.gender
                var arrcolors = ['black', 'white', 'blue', 'red', 'green', 'grey']
                var colorNotSelected = arrcolors.filter(value => colors.every(v => !v.includes(value)))
                var arrgenders = ['male', 'female']
                var genderNotSelected = arrgenders.filter(value => genders.every(v => !v.includes(value)))
                var cat = product.category
                var arrSizeClothes = ['M', 'L', 'XL', 'XXL', 'S', 'X']
                var arrSizeShoes = [38, 39, 40, 41, 42, 43]
                var arrSizeBag = ['M', 'L', 'XL', 'XXL', 'S', 'X']
                var arrSizeWatches = ['X', 'XL', 'Regular']
                var category = ['clothes', 'bag', 'watches', 'shoes']
                var categoryNotSelected = category.filter(value => cat.every(v => !v.includes(value)))
                console.log("categoryNotSelected:", categoryNotSelected)
                if (cat.includes('bag')) {
                    var sizeBagNotSelected = arrSizeBag.filter(value => sizes.every(v => !v.includes(value)))
                    var sizeBag = sizes
                }
                if (cat.includes('shoes')) {
                    var sizeShoesNotSelected = arrSizeShoes.filter(value => sizes.every(v => !v.includes(value)))
                    var sizeShoes = sizes
                }
                if (cat.includes('watches')) {
                    var sizeWatchesNotSelected = arrSizeWatches.filter(value => sizes.every(v => !v.includes(value)))
                    var sizeWatches = sizes
                }
                if (cat.includes('Male') || cat.includes('Female') || cat.includes('men') || cat.includes('women') || cat.includes('clothes')) {
                    var sizeClothesNotSelected = arrSizeClothes.filter(value => sizes.every(v => !v.includes(value)))
                    var sizeClothes = sizes
                }
                res.render('admin/editProduct', {
                    product: MongooseToObject(product),
                    categoryNotSelected: categoryNotSelected,
                    genders: genders,
                    colors: colors,
                    genderNotSelected: genderNotSelected,
                    colorNotSelected: colorNotSelected,
                    sizes: sizes,
                    sizeShoes: sizeShoes,
                    sizeBag: sizeBag,
                    sizeWatches: sizeWatches,
                    sizeClothes: sizeClothes,
                    sizeShoesNotSelected: sizeShoesNotSelected,
                    sizeBagNotSelected: sizeBagNotSelected,
                    sizeWatchesNotSelected: sizeWatchesNotSelected,
                    sizeClothesNotSelected: sizeClothesNotSelected,
                    layout: 'admin'
                })
            })
            .catch(next);

    }

    // [PUT] admin/products/:id
    saveUpdate(req, res, next) {
        var data = req.body;
        const file = req.file;
        if (file) {
            data.image = file.path.replace('src\\public\\', '\\')
        }
        if (data.category === 'clothes') {
            data.size = req.body.sizeClothes
        }
        if (data.category === 'bag') {
            data.size = req.body.sizeBag
        }
        if (data.category === 'watches') {
            data.size = req.body.sizeWatches
        }
        if (data.category === 'shoes') {
            data.size = req.body.sizeShoes
        }
        Product.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('/admin'))
            .catch(next);
    }

}

export default new AdminController;