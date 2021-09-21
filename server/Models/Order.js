const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    date: Date,
    status: {
        type: Boolean,
        default: false
    },
    dishID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

    
})

module.exports = mongoose.model('Order', OrderSchema)