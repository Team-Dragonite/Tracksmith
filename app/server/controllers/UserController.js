const db = require('../models/dbModel.js');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const UserController = {};

UserController.createUser = (req, res, next) => {
  console.log('We are in the user controller create user middleware');
  console.log('this is req.body', req.body);
  //console.log(bcrypt.hashSync(req.body.password, 10))
  const hash = bcrypt.hashSync(req.body.password, 10);
  if (!req.body.username || !req.body.password)
    return next(
      new Error('Please create an account with correct username and password')
    );
  const text = `INSERT INTO users(username, passcode, firstname, lastname) VALUES($1, $2, $3, $4);`;
  const cookie = 'placeholder';
  const values = [
    req.body.username,
    hash,
    req.body.firstname,
    req.body.lastname,
    //req.cookies.session_id,
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

UserController.verifyUser = (req, res, next) => {
  console.log('We are in the user controller verify user middleware');
  if (!req.body.username)
    return next(new Error('Please input a valid username'));
  const text = `SELECT * FROM users WHERE username=$1;`;
  const values = [req.body.username];
  db.query(text, values)
    .then((response) => {
      if (!response.rows.length) {
        console.log('username not found');
        return next(new Error('Username not found'));
      }
      const hash = response.rows[0].passcode;
      if (bcrypt.compareSync(req.body.password, hash)) {
        console.log('password is correct');
        return next();
      } else {
        console.log('password incorrect');
        return next(new Error('Password was incorrect'));
      }
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

UserController.setSessionCookie = (req, res, next) => {
    const session_id = uuid.v4();
    const text = `
      UPDATE users
      SET session_id=$1
      WHERE username=$2
    ;`;
    const values = [session_id, req.body.username];
  
    db.query(text, values)
      .then((response) => {
        res.cookie('session_id', session_id, {
          httpOnly: true,
          secure: true,
        });
        res.cookie('username', req.body.username);
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  };
  
 UserController.authorizeSession = (req, res, next) => {
    if (!req.cookies.session_id) {
      return next(new Error('Permission denied'));
    }
    const text = `
      SELECT * FROM users
      WHERE session_id = $1
    ;`;
    values = [req.cookies.session_id];
    db.query(text, values)
      .then((response) => {
        if (response.rows.length) {
          return next();
        } else {
          return next(new Error('Permission denied'));
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  };
  
  UserController.getApplicationsForAuthorizedUser = (req, res, next) => {
    if (!req.cookies.session_id) {
      return next(new Error('Permission denied'));
    }
    const text = `
      SELECT * FROM applications
      INNER JOIN users ON applications.username = users.username
      WHERE applications.application_id = $1
      AND users.session_id = $2
    ;`;
    values = [req.params.application_id, req.cookies.session_id];
    db.query(text, values)
      .then((response) => {
        if (response.rows.length) {
          return next();
        } else {
          return next(new Error('Permission denied'));
        }
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  };

module.exports = UserController;
