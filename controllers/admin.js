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
  Product.create({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price
  }).then(result => {
    console.log(result);
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
    res.redirect('/admin/products');
  });
  
};

exports.getEditProduct = (req, res, next) => {

  Product.findByPk(req.params.productId)
    .then(product => {
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
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id;
  console.log('postEditProduct...' + prodId);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  
  Product.findByPk(prodId)
    .then(product => {
      if(product) {
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
      }
      product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
}

exports.getProducts = (req, res, next) => {

  Product.findAll()
  .then(products => {
    res.render('admin/products', 
    {
      prods: products, 
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    })
};