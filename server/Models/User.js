const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    profileImage: String
})

module.exports = mongoose.model('User', UserSchema)