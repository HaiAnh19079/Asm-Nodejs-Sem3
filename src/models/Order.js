import mongoose from 'mongoose'
const { Schema } = mongoose
const OrderSchema = new Schema(
    {
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        // Cart
        cart: {
            type: Object,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            default: 'Payment on delivery',
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing',
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', OrderSchema)
export default Order
