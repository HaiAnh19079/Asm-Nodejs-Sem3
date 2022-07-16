import mongoose from 'mongoose'
const { Schema } = mongoose
// import mongooseDelete from 'mongoose-delete'
const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter Category name'],
        trim: true,
    },
})

const Category = mongoose.model('Category', CategorySchema)
export default Category;
