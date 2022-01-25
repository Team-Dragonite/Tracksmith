const db = require('../models/dbModel.js');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (res, req, next) => {
  console.log('We are in the user controller create user middleware');
  console.log('this is req.body', req.body);
  //console.log(bcrypt.hashSync(req.body.password, 10))
  const hash = bcrypt.hashSync(req.body.password, 10);
  if (!req.body.username || !req.body.password)
    return next(
      new Error('Please create an account with correct username and password')
    );
  const text = `INSERT INTO users(username, passcode, firstname, lastname, session_id) VALUES($1, $2, $3, $4, $5);`;
  const values = [
    req.body.username,
    hash,
    req.body.firstname,
    req.body.lastname,
    req.cookies.session_id,
  ];
  console.log(values);
  db.query(text, values)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.test = (res, req, next) => {
  console.log('this is req.body', req.body);
  return next();
};

userController.verifyUser = (res, req, next) => {
  console.log('We are in the user controller verify user middleware');
  if (!req.body.username)
    return next(new Error('Please input a valid username'));
  const text = `SELECT * FROM users WHERE username=$1;`;
  const values = [req.body.username];
  db.query(text, values)
    .then((response) => {
      if (!response.rows.length) {
        return next(new Error('Username not found'));
      }
      const hash = response.rows[0].passcode;
      if (bcrypt.compareSync(req.body.password, hash)) {
        console.log('password is correct');
        return next();
      } else {
        return next(new Error('Password was incorrect'));
      }
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = userController;
