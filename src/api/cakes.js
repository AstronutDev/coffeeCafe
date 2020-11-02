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
        res.json({
            'msg': 'can not fetch data'
        })
    }
})

router.get('/:name', async(req, res,next) => {
    let {name} = req.params
    try {   
        let response = await Cake.aggregate([
            { $match: {name}},
            { $unwind: "$name"}
        ])
        res.json({
            response
        })
    } catch (error) {
        res.status(404).json({
            'msg': `can not fetch ${name}`
        })
    }
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