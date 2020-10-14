const express = require('express');

const coffee = require('./coffees');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/coffees', coffee)

module.exports = router;
