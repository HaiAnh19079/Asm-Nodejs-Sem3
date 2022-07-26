import mongoose from 'mongoose'
const { Schema } = mongoose
const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        items: [
            {
                itemId: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product',
                },
                item:{
                    type:Object,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    default: 0,
                },
                size: {
                    type: String,
                    required: true,
                },
                color: {
                    type: String,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            default: 0,
        },
        totalQty: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)
CartSchema.methods.generateArray = function () {
    const arr = []
    for (let pro of this.items) {
        arr.push(pro)
    }
    return arr
}
const Cart = mongoose.model('Cart', CartSchema)
export default Cart
