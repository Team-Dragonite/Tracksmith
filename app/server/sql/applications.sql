DROP TABLE applications;

CREATE TABLE applications(
  _id SERIAL PRIMARY KEY,
  application_user  VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  company_type VARCHAR(100),
  job_title VARCHAR(100),
  cover_letter VARCHAR(100),
  resume_submitted VARCHAR(100),
  resume_version VARCHAR(100),
  application_date VARCHAR,
  hr_date VARCHAR,
  t1_date VARCHAR,
  interviewer VARCHAR,
  notes VARCHAR,
  conclusion VARCHAR,
);

INSERT INTO users (
    application_user, company, company_type, job_title, cover_letter, resume_submitted, resume_version, 
    application_date, hr_datem, t1_date, interviewer, notes, conclusion) VALUES ('1', 'Google', 'Tech', 
    'Software Engineer', 'true', 'true', 'Version A', '1/24/2022', NULL, NULL, NULL, "Google is cool", 'TBD');