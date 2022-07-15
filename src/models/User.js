const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            maxLength: [30, 'Name cannot exceed 30 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email address'],
            unique: true,
            validate: [validator.isEmail, 'Please enter valid email!'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [3, 'password should be at least 3 characters'],
            select: false,
        },
        avatar: [
            {
                url: {
                    type: String,
                    require: true,
                },
            },
        ],
        role: {
            type: String,
            default: 'user',
        },
        token: { type: String },

        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// generate JWT TOKEN
UserSchema.methods.generateJWT = function () {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    let payload = {
        id: this._id,
        // email: this.email,
        // role: this.role,
        // name: this.name,
        // avatar: this.avatar,
        // token: this.token
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    })
}

// generateVerificationToken
// UserSchema.methods.generateVerificationToken = function() {
//     let payload = {
//         userId: this._id,
//         token: crypto.randomBytes(20).toString('hex')
//     };

//     return new Token(payload);
// };

// ComparePassword
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
