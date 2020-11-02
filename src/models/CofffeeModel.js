const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeSchema = new Schema(
    {
        "name": { type: String, required: true },
        "price": { type: Number, required: true},
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const CoffeeModel = mongoose.model('Coffee', coffeeSchema)

module.exports = CoffeeModel
