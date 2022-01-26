const bcrypt = require('bcryptjs');
const db = require('../models/dbModel.js');

const ApplicationController = {};

ApplicationController.getApplications = (req, res, next) => {
  const text = `
    SELECT * FROM applications
    INNER JOIN users ON applications.application_user = users.username;`;
  // frontend will control order of applications
  db.query(text)
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
  const text = `INSERT into applications (application_user, company, company_type, job_title, cover_letter, resume_submitted, resume_version,
    application_date, hr_date, t1_date, interviewer, notes, conclusion, creation_date
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
  const values = [
    req.body.application_user, // not editable
    req.body.company,
    req.body.company_type,
    req.body.job_title,
    req.body.cover_letter,
    req.body.resume_submitted,
    req.body.resume_version,
    req.body.application_date,
    req.body.hr_date,
    req.body.t1_date,
    req.body.interviewer,
    req.body.notes,
    req.body.conclusion,
    creation_date, // not editable
  ];
  db.query(text, values)
    .then((response) => next())
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

ApplicationController.putApplication = (req, res, next) => {
  const text = `UPDATE applications SET company=$1, company_type=$2, job_title=$3, cover_letter=$4, resume_submitted=$5, 
                resume_version=$6, application_date=$7, hr_date=$8, t1_date=$9, interviewer=$10, notes=$11, conclusion=$12 
                WHERE application_id=$13;`;
  const values = [
    req.body.company,
    req.body.company_type,
    req.body.job_title,
    req.body.cover_letter,
    req.body.resume_submitted,
    req.body.resume_version,
    req.body.application_date,
    req.body.hr_date,
    req.body.t1_date,
    rew.body.interviewer,
    req.body.notes,
    req.body.conclusion,
    req.params.application_id,
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
