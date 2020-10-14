const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeSchema = new Schema(
    {
        "name": String,
        "price": Number,
        "tableOrdered": Number,
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const CoffeeModel = mongoose.model('Coffee', coffeeSchema)

module.exports = CoffeeModel
