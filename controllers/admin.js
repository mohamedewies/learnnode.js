const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', 
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      product: {}
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.productId, product => {
    if(!product) {
      res.status(404).render('404', {pageTitle: 'Page Not Found', path: '/404'});
    }
    res.render('admin/edit-product', 
    {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product
    }); 
  });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id;
  console.log('postEditProduct...' + prodId);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  console.log(`postEditProduct description: ${description}`);
  const product = new Product(prodId, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', 
    {
      prods: products, 
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};