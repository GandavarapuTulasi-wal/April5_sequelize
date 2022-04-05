const { body, validationResult } = require('express-validator');
const Todo = require('../models/todo');
function getTodos(req, res) {
  Todo.find((err, todos_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(todos_list);
    }
  });
}
const createTodo = [
  body('item')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('min should be 3 and max should be 20')
    .escape()
    .isAlphanumeric()
    .withMessage('No special charcters allowed'),
  body('status')
    .trim()
    .isLength({ min: 8, max: 10 })
    .withMessage('min should be 8 and max should be 10'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { item, status } = req.body;
      console.log(req.body);
      let todoObject = new Todo({ item, status });
      todoObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding todo complete' });
        }
      });
    }
  },
];
function deleteTodo(req, res) {
  Todo.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`todo with _id as ${req.params._id} is removed`);
    }
  });
}
function editTodo(req, res) {
  const updateOb = req.body;
  Todo.findByIdAndUpdate(req.params._id, updateOb, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`todo with ${req.params._id} updated`);
    }
  });
}
module.exports = { getTodos, createTodo, deleteTodo, editTodo };
