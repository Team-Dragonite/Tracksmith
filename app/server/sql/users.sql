DROP TABLE users;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username  VARCHAR(100) NOT NULL,
  passcode  VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  session_id uuid
);

INSERT INTO users (username, passcode, firstname, lastname) VALUES ('test', 'password123', 'test', '123');