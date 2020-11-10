const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain the string "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
})

userSchema.virtual('allShifts', {
    ref: 'Shift',
    localField: '_id',
    foreignField: 'createdBy'
})
userSchema.virtual('nextShift', {
    ref: 'Shift',
    localField: '_id',
    foreignField: 'createdBy'
})
userSchema.virtual('fortnightShifts', {
    ref: 'Shift',
    localField: '_id',
    foreignField: 'createdBy'
})
userSchema.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'createdBy'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisissecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login. Please check your email and password and try agian.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login. Please check your email and password and try agian.')
    }

    return user

}


//hash pasword before save
userSchema.pre('save', async function (next) {
    const user = this

    console.log('just befores saving')

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

const User = mongoose.model('User', userSchema)


module.exports = User