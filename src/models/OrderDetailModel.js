const mongoose = require('mongoose')

const orderDetailSchema = mongoose.Schema({
    amount: { type: Number, require: true},
    coffeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coffee' }
})

const OrderModel = mongoose.model('OrderDetail', orderDetailSchema)

module.exports = OrderModel