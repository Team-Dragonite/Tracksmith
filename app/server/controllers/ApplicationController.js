/* eslint-disable camelcase */
/* eslint-disable no-console */
const bcrypt = require('bcryptjs'); // bcrypt not used
const db = require('../models/dbModel');

const ApplicationController = {};

ApplicationController.getApplications = (req, res, next) => {
  const text = `
    SELECT * FROM applications
    WHERE application_user = $1;`;
  const values = [req.body.username];
  db.query(text, values)
    .then((response) => {
      res.locals.applications = response.rows;
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

ApplicationController.postApplication = (req, res, next) => {
  const creation_date = new Date().toLocaleString();
  const text = `INSERT into applications (application_user, company, job_title, 
               application_date, creation_date) VALUES($1, $2, $3, $4, $5);`;
  const values = [
    req.body.application_user, // 1 - not editable
    req.body.companyName, // 2 - company
    req.body.position, // 3 - job_title
    req.body.date, // 4 - application_date
    creation_date, // 5 - not editable
  ];
  // username, companyname, position, date
  db.query(text, values)
    .then((response) => next()) // eslint error - response not used - is this correct??
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

ApplicationController.putApplication = (req, res, next) => {
  const text = `UPDATE applications SET company=$1, job_title=$2, application_date=$3, cover_letter=$4, resume_submitted=$5, hr_date=$6, t1_date=$7, onsite=$8, application_status=$9, notes=$10 
                WHERE application_id=$11`;

  const values = [
    req.body.companyName, // 1 - company
    req.body.position, // 2 - job_title
    req.body.date, // 3 - application_date
    req.body.coverLetter, // 4 - cover_letter
    req.body.resumeSubmitted, // 5 - resume_submitted
    req.body.HRScreen, // 6 - hr_date
    req.body.technicalInterview, // 7 - t1_date
    req.body.onSite, // 8 - onsite
    req.body.status, // 9 - application_status
    req.body.notes, // 10 - notes
    req.params.application_id, // 11 - application_id
  ];
  db.query(text, values)
    .then((response) => {
      res.locals.updatedApplication = response.rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

ApplicationController.deleteApplication = (req, res, next) => {
  const text = 'DELETE FROM applications WHERE application_id=$1;';
  const values = [req.params.application_id];
  db.query(text, values)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = ApplicationController;
