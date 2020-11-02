const mongoose = require('mongoose')

const orderDetailSchema = mongoose.Schema({
    coffeeId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Coffee',

     },
    amount: { type: Number, require: true}
})

const OrderModel = mongoose.model('OrderDetail', orderDetailSchema)

module.exports = OrderModel