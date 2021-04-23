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
}