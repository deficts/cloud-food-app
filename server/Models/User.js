const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    lastName: String,
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)