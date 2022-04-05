const express = require('express');
const router = express.Router();
const productModel = require('../mysqlmodels/product');
const hobbyModel = require('../models').Hobby;
router.get('/', function (req, res) {
  productModel.findAll().then(
    function (products) {
      res.status(200).json(products);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.get('/hobbies/create', function (req, res) {
  hobbyModel.create({ name: 'hobby1', description: 'description1' }).then(
    (hobby) => {
      res.status(200).json(hobby);
    },
    (err) => {
      res.status(500).json(err);
    }
  );
});
module.exports = router;
