DROP TABLE applications;

CREATE TABLE applications(
  application_id SERIAL PRIMARY KEY,
  application_user  VARCHAR(100),
  company VARCHAR(100) NOT NULL,
  company_type VARCHAR(100),
  job_title VARCHAR(100),
  cover_letter VARCHAR(100),
  resume_submitted VARCHAR(100),
  resume_version VARCHAR(100),
  application_date VARCHAR,
  hr_date VARCHAR,
  t1_date VARCHAR,
  onsite VARCHAR,
  interviewer VARCHAR,
  notes VARCHAR,
  application_status VARCHAR,
  creation_date VARCHAR
);

INSERT INTO applications (
    application_user, company, company_type, job_title, cover_letter, resume_submitted, resume_version, 
    application_date, hr_date, t1_date, onsite, interviewer, notes, application_status, creation_date) VALUES ('1', 'Google', 'Tech', 
    'Software Engineer', 'true', 'true', 'Version A', '1/24/2022', NULL, NULL, NULL, NULL, 'Google is cool', 'TBD', '1/24/2022');