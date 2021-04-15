const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

const { products } = require('../routes/admin');

router.get('/', (req, res, next) => {
  console.log('shop.js', products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;