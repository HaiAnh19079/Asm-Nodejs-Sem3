import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
const { Schema } = mongoose
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxLength: [9, 'Price cannot exceed 9 characters'],
        },
        images: [
            {
                url: {
                    type: String,
                    require: true,
                },
            },
        ],
        category: {
            type: String,
            require: [true, 'Please enter product category'],
        },
        stock: {
            type: Number,
            require: [true, 'Please enter product Stock'],
            maxLength: [4, 'Stock cannot exceed 4 characters'],
            default: 10,
        },
        genders: [
            {
                type: String,
                required: true,
            },
        ],
        colors: [
            {
                type: String,
                required: true,
            },
        ],
        sizes: [
            {
                type: String,
                required: true,
            },
        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

//Add plugin
ProductSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true })
const Product = mongoose.model('Product', ProductSchema)
export default Product
