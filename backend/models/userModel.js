const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    nationality: { type: String },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    portfolio: { type: Array},
    profilePicture: { type: String },
    password: { type: String, required: true }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function
    (fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, password) {

    // validation
    if (!fullName || !email || !phoneNumber || !location || !dateOfBirth || !gender || !password) {
        throw Error('Please fill all requirements')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please enter valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please enter strong password')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // salting password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ fullName, email, phoneNumber, location, nationality, dateOfBirth, gender, portfolio, profilePicture, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('Please fill all requirements')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid Credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid Credentials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)