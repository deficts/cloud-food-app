const mongoose = require('mongoose')

const DishSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    chefID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true
    }
})

module.exports = mongoose.model('Dish', DishSchema)