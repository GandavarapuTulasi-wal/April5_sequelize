const bcrypt = require('bcrypt');
const User = require('../models/user');
exports.createUser = function (req, res) {
  console.log(req.body);
  let encryptedPassword;
  try {
    //we generete salt to do encrytion as we need it when we are converting our normal password tohased password
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log(error);
    console.log('error in bcrypt');
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
