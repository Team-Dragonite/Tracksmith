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
    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .send({ response: true });
  }
);

// user posts new credentials
router.post(
  '/signup',
  UserController.createUser,
  UserController.setSessionCookie,
  (req, res) => {
    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .send({ response: true });
  }
);

// once user signs in they are given their job applications page
router.post(
  '/getApplications/',
  //UserController.authorizeSession,
  //UserController.getApplicationsForAuthorizedUser,
  ApplicationController.getApplications,
  (req, res) => {
    res.status(200).json(res.locals.applications);
  }
);

// user addition of a new job application
router.post(
  '/postApplication',
  // middleware to verify user is signed in
  // UserController.authorizeSession,
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
  ApplicationController.putApplication,
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
 * POST /api/postApplication {"application_user": "test2", "company": "test", "position": "SWE", "date": "1/26/22"}
 * PUT /api/putApplication/:application_id {“companyName”: “test123", “position”: “SWE2", “date”: “1/27/22", “coverLetter”:“true”, “resumeSubmitted”:“Version A”, “HRScreen”:“1/27/22", “technicalInterview”: “2/23/22", “onSite”: “1/31/22", “status”:“rejected”, “notes”: “this is an update”}
 * DELETE /api/deleteApplication/:application_id
 * POST api/applicationsCalendar/ {"session_id": "02674334-d1e5-4b7b-900a-42bfeedc7b9d"}
 */
