const express = require('express');
const router = express.Router();
const usersModel = require('../models').Users;
router.get('/', function (req, res) {
  usersModel.findAll().then(
    function (users) {
      res.status(200).json(users);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.post('/', function (req, res) {
  const { username, password, date_of_creation } = req.body;
  usersModel.findOne({ where: { username } }).then(
    (user) => {
      if (user) {
        res.json({ status: 0, debug_data: 'user already Exists' });
      } else {
        usersModel
          .create({ username, password, date_of_creation })
          .then((user) => {
            res.json({ status: 1, data: 'user created' });
          });
      }
    },
    (error) => {
      res.status(500).json(error);
    }
  );
});
router.delete('/delete/:username', function (req, res) {
  usersModel
    .destroy({ where: { username: req.params.username } })
    .then((user) => {
      (user) => {
        res.status(200).json({ status: 1, data: 'user deleted successfully' });
      },
        (err) => {
          res.status(500).send(err);
        };
    });
});
router.get('/getuser/:username', function (req, res) {
  usersModel.findOne({ where: { username: req.params.username } }).then(
    (user) => {
      if (user) res.status(200).json(user);
      else res.json({ status: 0, data: 'user not found' });
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});
router.put('/update/:username', function (req, res) {
  const { username, password, date_of_creation } = req.body;
  usersModel.findOne({ where: { username: req.params.username } }).then(
    (user) => {
      if (user) {
        usersModel
          .update(
            { username, password, date_of_creation },
            { where: { username: req.params.username } }
          )
          .then((user) => {
            res.json({ status: 1, data: 'User modified Successfully' });
          });
      } else {
        res.json({ status: 0, data: 'user  Not Found' });
      }
    },
    (err) => {
      res.status(500).json(err);
    }
  );
});
router.post('/checklogin', function (req, res) {
  const { username, password } = req.body;
  usersModel
    .findOne({
      where: { username: req.body.username, password: req.body.password },
    })
    .then(function (user) {
      if (user) {
        req.session['username'] = username;
        req.session['loggedIn'] = 1;
        res.json({ status: 1, data: username });
      } else {
        req.session['loggedIn'] = 0;
        res.json({ status: 0, data: 'Incorrect Login Details' });
      }
    });
});
router.get('/details', function (req, res) {
  if (req.session.loggedIn) {
    usersModel
      .findOne({
        where: { username: req.session.username },
      })
      .then((user) => {
        res.status(200).json({ details: user });
      });
  } else {
    res.json({ status: 0, data: 'You are not logged In' });
  }
});
module.exports = router;
