const { response } = require('express');
const Category = require('../models/category');
exports.createCategory = (request, response) => {
  let categoryOb = new Category(request.body);
  categoryOb.save((err) => {
    if (err) {
      response.json(err);
    } else {
      response.json({
        status: 1,
        data: { msg: 'Category created Successfully' },
      });
    }
  });
};
exports.getCategories = (request, response) => {
  Category.find((err, categories_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { categories_list } });
    }
  });
};
exports.deleteCategory = (request, response) => {
  Category.findByIdAndDelete(
    request.params.bookid,
    request.body,
    function (err) {
      console.log(request.body);
      if (err) {
        response.json(err);
      } else {
        response.json({
          status: 1,
          data: { msg: `category removed with id ${request.params.bookid}` },
        });
      }
    }
  );
};
exports.updateCategories = (request, response) => {
  const newCategories = request.body;
  Category.findByIdAndUpdate(request.params.id, newCategories, function (err) {
    if (err) {
      response.json(err);
    } else {
      response.json({
        status: 1,
        data: { msg: `category with id ${request.params.id} is updated` },
      });
    }
  });
};
