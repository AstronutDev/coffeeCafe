const express = require('express')
const router = express.Router()
const Cake = require('../models/Cake')

router.get('/', async (req, res, next) => {
    try {
        const cakeItem = await Cake.find({})
        const data = {
            cakes: cakeItem
        }
        res.json(data)
    } catch (error) {
        console.log(err);
        next(err)
    }
})

router.get('/test', (req, res, next) => {
    res.send('test')
})

router.post('/', async (req, res, next) => {
    let {name, price} = req.body
    try {
        await Cake.create({
            name,
            price
        })
        res.json({
            'msg': 'add success'
        })
    } catch (err) {
        console.log(err);
        next(err)
    }

})

module.exports = router