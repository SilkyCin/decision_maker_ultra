const db = require('../db');

// Gets poll data based on user id
const getPollsByUserId = (userID) => {
  const queryString = `
  SELECT title, description, numops
  FROM polls
  WHERE user_id = $1;`;
  const queryParams = [userID];
  return db.query(queryString, queryParams)
    .then((response) => response.rows);
};

//Gets options for the poll specified by poll id
const getOptionsByPollId = (req) => {
  const queryString = `
  SELECT o.id, o.poll_id, o.choice, p.title, p.description
  FROM options as o
  INNER JOIN polls as p
  ON o.poll_id = p.id
  WHERE o.poll_id = $1;`;
  const queryParams = [req.poll_id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows);
};

//Gets options for the poll specified by poll id
const displayOptionsByPollId = (req) => {
  const queryString = `
  SELECT * FROM options
  WHERE poll_id = $1;`;
  const queryParams = [req.poll_id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows);
};

// Updates the options of a poll
const updatePollOptionsById = (id, choice) => {
  const queryString = `
  UPDATE options
  SET choice = $2
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [id, choice];
  return db.query(queryString, queryParams);
};

//Updates the title and/or description of a poll
const updatePollById = (p, req) => {
  const queryString = `
  UPDATE polls
  SET title = $1, description = $2
  WHERE id = $3
  RETURNING *;`;
  const queryParams = [p.title, p.desc, req.poll_id];
  return db.query(queryString, queryParams);
};

//Get title of a poll
const displayTitleByPollId = (req) => {
  const id = Number(req.poll_id);
  const queryString = `
  SELECT title, description FROM polls
  WHERE id = $1;`;
  const queryParams = [id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows[0]);
};

//Get number of options in a poll
const getNumOps = (id) => {
  const queryString = `
  SELECT numops
  FROM polls
  WHERE id = $1;`;
  const queryParams = [id];
  return db.query(queryString, queryParams)
    .then((res) => res.rows[0].numops);
};

//Get poll information associated with email address
const dispPollsByUserEmail = (email) => {
  return db.query(`
  SELECT p.id, p.title, p.description, p.admin_url, p.voting_url
  FROM polls as p INNER JOIN users as u
  ON u.id = p.user_id
  WHERE u.email = $1;`
  , [email])
    .then(response => response.rows);

};

//Inserts the user_id, title and description of a new poll
const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (user_id, title, description, numOps)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  const queryParams = [newPoll.user_id, newPoll.title, newPoll.desc, newPoll.nums];
  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

//Inserts the admin_url and voting_url
const updateURLs = (req) => {
  const queryString = `
  UPDATE polls
  SET admin_url = $1, voting_url = $2
  WHERE id = $3
  RETURNING *;`;
  const queryParams = [`/admin/${req.u_id}/${req.poll_id}`, `/vote/${req.poll_id}`, req.poll_id];
  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

//Inserts options one at a time into the options table
const insertOptions = (data) => {
  const queryString = `
  INSERT INTO options (poll_id, choice)
  VALUES ($1, $2)
  RETURNING *`;
  const queryParams = [data.poll_id, data.choice];
  return db.query(queryString, queryParams);
};

module.exports = {
  getPollsByUserId,
  getOptionsByPollId,
  displayOptionsByPollId,
  updatePollOptionsById,
  updatePollById,
  displayTitleByPollId,
  dispPollsByUserEmail,
  getNumOps,
  insertNewPoll,
  updateURLs,
  insertOptions
};
