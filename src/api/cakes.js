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
        let response = await Cake.findOne({ name })
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

router.put('/:productName', async(req, res, next) => {
    let {productName} = req.params
    let {name, price} = req.body
    try {
        const updated = {
            $set: {
                name,
                price
            }
        }

        await Cake.updateOne( {name: productName}, updated)
        res.json({
            'msg': 'updated success'
        })
    } catch (error) {
        res.status(400).json({
            'error': 'updated fail'
        })
    }
})

router.delete('/:productName', async(req, res, next) => {
    let {productName} = req.params
    try {
        await Cake.remove({ name: productName })
        res.json({
            'msg': `delete ${productName} success`
        })
    } catch (error) {
        res.status(400).json({
            'error': 'delete fail'
        })
    }
})

module.exports = router