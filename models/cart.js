const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
  
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProduct = cart.products.find(prod => prod.id === id);
      let updatedProduct;
      if(existingProduct) {
        updatedProduct = existingProduct;
        updatedProduct.qty++;
      } else {
        updatedProduct = { id: id, qty: 1};
        cart.products.push(updatedProduct);
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if(err) {
        return;
      }
      let cart = JSON.parse(fileContent);
      const updatedCart = { ...cart};
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQty = product.qty;

      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });

    });
  }
}