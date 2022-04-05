const { body, validationResult } = require('express-validator');
const Forum = require('../models/forum');
function getForums(req, res) {
  Forum.find((err, forums_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(forums_list);
    }
  });
}
const createForum = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('title should be  min 10 and max 100 characters'),
  body('forumBody')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('forum body should be  min 50 and max 500 characters'),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage('author name not contain special Characters')
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should be min 5 and max 50 characters'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { title, forumbody, doc, author } = req.body;
      console.log(req.body);
      let forumObject = new Forum({ title, forumbody, doc, author });
      forumObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding Forum complete' });
        }
      });
    }
  },
];
const updateForum = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('title should be  min 10 and max 100 characters'),
  body('forumbody')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('forum body should be  min 50 and max 500 characters'),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage('author name not contain special Characters')
    .isLength({ min: 5, max: 50 })
    .withMessage('author name should be min 5 and max 50 charcters'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let newForums = { $set: req.body };
      Forum.findByIdAndUpdate(req.params.id, newForums, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json(`Forum with id as ${req.params.id} is updated`);
        }
      });
    }
  },
];

function deleteForum(req, res) {
  Forum.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Forum is updated with ${req.params.id} `);
    }
  });
}
module.exports = { getForums, createForum, deleteForum, updateForum };
