const express = require('express')
const router = express.Router()

const OrderDetail = require('../models/OrderDetailModel')
const Order = require('../models/Order')

router.get('/', async (req, res, next) => {
    const orders = await Order.find()
    .populate({ 
        path: 'orderDetailIds',
        populate: "coffeeId"
    })
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


router.post('/', async (req, res, next) => {
    let { products } = req.body
    try {
        const createdOrderDetails = await OrderDetail.create(products)
        const createdOrder = await Order.create({
            orderDetailIds: createdOrderDetails.map( ({_id}) => _id)
        })
        console.log(createdOrderDetails);
        res.json({ createdOrder })
    } catch (err) {
        next(err)
    }
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