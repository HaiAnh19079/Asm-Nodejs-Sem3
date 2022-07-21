import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
const { Schema } = mongoose
const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter Category name'],
        trim: true,
    },
})

CategorySchema.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
})
const Category = mongoose.model('Category', CategorySchema)
export default Category
