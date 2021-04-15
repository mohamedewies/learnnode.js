const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

const { products } = require('../routes/admin');

router.get('/', (req, res, next) => {
  
  res.render('shop', {prods: products, docTitle: 'Shop'});
});

module.exports = router;