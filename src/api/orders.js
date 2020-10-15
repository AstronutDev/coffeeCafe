const express = require('express')
const { model } = require('../models/CofffeeModel')
const router = express.Router()

const OrderDetail = require('../models/OrderDetailModel')
const Coffee = require('../models/CofffeeModel')
const { response } = require('express')

router.get('/', (req, res, next) => {
    OrderDetail.find()
    .populate({ path: 'coffeeId', select: 'name price'})
    .exec()
    .then(docs => {
        res.json({
            count: docs.length,
            docs
        })
    })
    .catch(error => {
        res.json({error})
    })
})

router.get('/:orderId', (req, res, next) => {
    const {orderId} = req.params
    OrderDetail.findById(orderId)
    .exec()
    .then( order => {
        if (!order) {
            return res.json({'message':'order not found'})
        }
        res.json({
            order: order
        })
    })
    .catch(error => {
        res.status(500).json({'message': 'order not found'})
    })
})


router.post('/', (req, res, next) => {
    Coffee.findById(req.body.coffeeId)
        .then(coffee => {
            const newOrder = new OrderDetail({
                amount: req.body.amount,
                coffeeId: req.body.coffeeId
            })
            return newOrder.save()
        })
        .then(result => {
            res.json({
                'message': 'order stored',
                createdOrder: {
                    amount: result.amount,
                    coffeeId: result.coffeeId
                }
            })
        })
        .catch(error => {
            res.status(404).json({
                'message': 'coffee not found'
            })
        })
})


router.put('/:orderId', (req, res, next) => {
    const {orderId} = req.params
    const {amount, coffeeId} = req.body
    const updated = {
         $set: {
            amount,
            coffeeId
         }
    }
    console.log(orderId);
    OrderDetail.findByIdAndUpdate(orderId, updated)
        .then(response => {
            res.json({
                'message': 'updated success',
                updaeted: response
            })
        })
        .catch(error => {
            res.json({
                'message': `${error}`
            })
        })
})

router.delete('/:orderId', (req, res, next) => {
    const {orderId} = req.params
    OrderDetail.findByIdAndDelete(orderId)
    .then( () => {
        res.json({
            'message': `${orderId} is deleted`
        })
    })
    .catch( () => {
        res.json({
            'message': 'delete fail'
        })
    })
})

module.exports = router