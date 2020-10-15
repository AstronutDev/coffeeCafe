const express = require('express');

const coffee = require('./coffees');
const order = require('./orders')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/coffees', coffee)
router.use('/orders', order)

module.exports = router;
