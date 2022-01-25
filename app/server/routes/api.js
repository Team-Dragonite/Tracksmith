const express = require('express');
const userController = require('../controllers/userController');
const applicationController = require('../controllers/applicationController');

const router = new express.Router();

// user posts exisitng credentials
router.post(
  '/login',
  userController.verifyUser,
  // middleware to set session cookie
  (req, res) => {
    res.sendStatus(200).redirect('/');
  }
);

// user posts new credentials
router.post(
  '/signup',
//   userController.createUser,
userController.test,
  // middleware to set session cookie
  (req, res) => {
    res.sendStatus(200);//.redirect('/login');
  }
);

// once user signs in they are given their job applications page
router.get(
  '/getApplications/',
  // middleware to verify user is signed in
  applicationController.getApplications,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// user addition of a new job application
router.post(
  '/postApplication/',
  // middleware to verify user is signed in
  applicationController.postApplication,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// update job application
router.put(
  '/putApplication/:application_id', //consider cloaking application_id
  // middleware to verify user is signed in
  // middleware to update an existing application
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// delete job application
router.delete(
  '/deleteApplication/:application_id', //consider cloaking application_id
  // middleware to verify user is signed in
  applicationController.deleteApplication,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// display job applications calendar
router.get(
  '/applicationsCalendar/',
  // middleware to get all applications from the db
  (req, res) => {
    res.sendStatus(200).redirect('/celendar');
  }
);

module.exports = router;
