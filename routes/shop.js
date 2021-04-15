const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

const { products } = require('../routes/admin');

router.get('/', (req, res, next) => {
  
  res.render('shop', 
  {
    prods: products, 
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;