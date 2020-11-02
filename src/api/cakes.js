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

router.get('/:id', async(req, res,next) => {
    let {id} = req.params
    try {  
        let response = await Cake.findById(id)
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

router.put('/:id', async(req, res, next) => {
    let {id} = req.params
    let {name, price} = req.body
    try {
        const updated = {
            $set: {
                name,
                price
            }
        }

        await Cake.findByIdAndUpdate( id, updated)
        res.json({
            'msg': 'updated success'
        })
    } catch (error) {
        res.status(400).json({
            'error': 'updated fail'
        })
    }
})

router.delete('/:id', async(req, res, next) => {
    let {id} = req.params
    try {
        await Cake.findByIdAndDelete(id)
        res.json({
            'msg': `delete ${id} success`
        })
    } catch (error) {
        res.status(400).json({
            'error': 'delete fail'
        })
    }
})

module.exports = router