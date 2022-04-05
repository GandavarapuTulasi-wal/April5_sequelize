const { response } = require('express');
const Product = require('../models/product');
exports.getProducts = (request, response) => {
  Product.find((err, products_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json(products_list);
    }
  });
};
exports.createProducts = (request, response) => {
  productOb = new Product(request.body);
  productOb.save((err) => {
    if (err) {
      response.json(err);
    } else {
      response.json({
        status: 1,
        data: { msg: 'Product created Successfully' },
      });
    }
  });
};
exports.editProducts = (request, response) => {
  const updatedProduct = request.body;
  Product.findByIdAndUpdate(request.params.id, updatedProduct, function (err) {
    if (err) {
      response.json(err);
    } else {
      response.json({
        status: 1,
        data: { msg: `product is modified with id ${request.params.id}` },
      });
    }
  });
};
exports.getProductById = (request, response) => {
  Product.findById(request.params.id).exec((err, product_data) => {
    if (err) {
      response.json(err);
    } else {
      response.json({
        status: 1,
        data: { product_data },
      });
    }
  });
};
exports.deleteProduct = (request, response) => {
  Product.findByIdAndDelete(request.params.id).exec((err) => {
    if (err) {
      response.json(err);
    } else {
      response.json(`product deleted with id ${request.params.id}`);
    }
  });
};
exports.showProductByName = (request, response) => {
  Product.find({ name: request.params.name }).exec((err, product_data) => {
    if (err) {
      response.json(err);
    } else {
      response.json(product_data);
    }
  });
};
exports.findProductByAvailability = (request, response) => {
  Product.find({ availability: request.params.availability }).exec(
    (err, product) => {
      if (err) {
        response.json(err);
      } else {
        response.json(product);
      }
    }
  );
};
exports.findProductByPrice = (request, response) => {
  Product.find({ price: { $gte: request.params.price } }).exec(
    (err, product) => {
      if (err) {
        response.json(err);
      } else {
        response.json(product);
      }
    }
  );
};
