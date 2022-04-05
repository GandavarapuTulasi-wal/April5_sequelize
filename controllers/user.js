const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticationmiddleware = require('../middlewares/authentication');
exports.createUser = function (req, res) {
  console.log(req.body);
  let encryptedPassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log(error);
    console.log('error in brcypt');
  }
  const userOb = new User({
    name: req.body.name,
    age: req.body.age,
    dob: req.body.dob,
    password: encryptedPassword,
    email: req.body.email,
  });
  console.log(userOb);
  userOb.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json('User created succesfully');
    }
  });
};
exports.getUsers = (request, response) => {
  User.find((err, users_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { users_list } });
    }
  });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let userObj = await User.findOne({ email });
  if (!userObj) {
    res.status(400).json({ status: 0, debug_data: 'user not found' });
  } else {
    const passCorrect = await bcrypt.compareSync(password, userObj.password);
    if (!passCorrect) {
      res.status(400).json({ status: 0, debug_data: 'user credentials wrong' });
    }
    const payload = {
      user: {
        email: email,
      },
    };
    jwt.sign(payload, 'secret_string', { expiresIn: 1200 }, (err, token) => {
      if (err) {
        throw error;
        res.json({ status: 0, debug_data: 'temporary error in backend' });
      }
      res.status(200).json({ token });
    });
  }
};
exports.listUsers = [
  authenticationmiddleware,
  function (req, res) {
    console.log(User);
    User.find(function (err, users_list) {
      if (err) {
        console.log(err);
      } else {
        console.log(users_list);
        res.json(users_list);
      }
    });
  },
];
