const express = require('express');

const coffee = require('./coffees');
const order = require('./orders')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.get('/test', (req, res, next) => {
  res.json({
    "name": "s",
    "age": 23
  })
})

router.use('/coffees', coffee)
router.use('/orders', order)

module.exports = router;
