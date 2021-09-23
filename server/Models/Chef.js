const mongoose = require('mongoose')

const ChefSchema = mongoose.Schema({
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

module.exports = mongoose.model('Chef', ChefSchema)