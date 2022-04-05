const { body, validationResult } = require('express-validator');
const Author = require('../models/author');
function getAuthors(req, res) {
  Author.find((err, authors_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(authors_list);
    }
  });
}
const createAuthor = [
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { first_name, last_name, dob, dod } = req.body;
      console.log(req.body);
      let authorObject = new Author({ first_name, last_name, dob, dod });
      authorObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding author complete' });
        }
      });
    }
  },
];
function deleteAuthor(req, res) {
  Author.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`author with _id as ${req.params._id} is removed`);
    }
  });
}
module.exports = { getAuthors, createAuthor, deleteAuthor };
