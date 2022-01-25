DROP TABLE users;

CREATE TABLE users(
  _id SERIAL PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  password  VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  session_id uuid
);

INSERT INTO users (username, password, firstname, lastname) VALUES ('test', 'password123', 'test', '123');