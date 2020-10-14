const express = require('express')
const Coffee = require('../models/CofffeeModel')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const coffeeItem = await Coffee.find({})
        res.json({coffeeItem})
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    console.log(req.params);
    try {
        const data = await Coffee.find( {"_id": id})
        res.json({data})
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { name, price, tableOrdered } = req.body
    let newCoffee = new Coffee( {
        name,
        price,
        tableOrdered
    })
    try {
        let x = await newCoffee.save()
        res.json({ message: "add success"})
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const {id} = req.params
    const {name, price, tableOrder} = req.body
    try {
        const updated = {
            $set: {
                name,
                price
            }
        }
        await Coffee.findByIdAndUpdate(id, updated)
        res.json({ 'message': 'updated success'})
    } catch (error) {
        res.status(400).json({ 'message': "updated fail"})
    }
})

router.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        await Coffee.findByIdAndDelete(id)
        res.json({ 'message': 'deleted success'})
    } catch (error) {
        res.status(400).json({ 'message': 'delete fail'})
    }
})

module.exports = router