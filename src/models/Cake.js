const mongoose = require('mongoose')

const CakeSchema = new mongoose.Schema({
    "name": {
        type: String
    },
    "price": {
        type: Number
    }
})

module.exports = mongoose.model('Cake', CakeSchema)