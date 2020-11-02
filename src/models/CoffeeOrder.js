const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeOrderSchema = new Schema(
    {
        
    },
    {
        versionKey: false,
    }
)

const CoffeeOrder = mongoose.model('CoffeeOrder', coffeeOrderSchema)

module.exports = CoffeeOrder
