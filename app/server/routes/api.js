const express = require('express');
const UserController = require('../controllers/UserController.js');
const ApplicationController = require('../controllers/ApplicationController.js');

const router = new express.Router();

// user posts exisitng credentials
router.post(
  '/login',
  UserController.verifyUser,
  UserController.setSessionCookie,
  (req, res) => {
    res.status(200).set({'Content-Type': 'application/json'}).send({response: true});
  }
);

// user posts new credentials
router.post(
  '/signup',
  UserController.createUser,
  UserController.setSessionCookie,
  (req, res) => {
    res.sendStatus(200).redirect('/login');
  }
);

// once user signs in they are given their job applications page
router.post(
  '/getApplications/',
  UserController.authorizeSession,
  UserController.getApplicationsForAuthorizedUser,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// user addition of a new job application
router.post(
  '/postApplication',
  // middleware to verify user is signed in
  UserController.authorizeSession,
  ApplicationController.postApplication,
  (req, res) => {
    console.log('were are in the router');
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
  ApplicationController.deleteApplication,
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

/**
 * POST /api/login {"username": "test2", "password": "password123"}
 * POST /api/signup {“username”: “test2", “password”: “password123", “firstname”: “test2", “lastname”:“test2"}
 * POST /api/getApplications {"users.username": "test2"}
 * POST /api/postApplication {"application_user": "", "company": "", "company_type": "", "job_title": "",
    cover_letter,
    resume_submitted,
    resume_version,
    application_date,
    hr_date,
    t1_date,
    interviewer,
    notes,
    conclusion,
    creation_date}
 * PUT /api/putApplication/:application_id
 * DELETE /api/deleteApplication/:application_id
 * POST api/applicationsCalendar/ {"session_id": "02674334-d1e5-4b7b-900a-42bfeedc7b9d"}
 */