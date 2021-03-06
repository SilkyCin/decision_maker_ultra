\c template1

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS polls CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);


CREATE TABLE polls (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  admin_url VARCHAR(255),
  voting_url VARCHAR(255),
  choice JSON
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  guest_name VARCHAR(255),
  rank JSON
);
