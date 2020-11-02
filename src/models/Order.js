const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderDetailIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderDetail'
        }
    ]
})

module.exports = mongoose.model('Order', OrderSchema)