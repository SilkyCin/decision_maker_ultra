const db = require('../db');

// gets poll data based on user id
const getPollsByUserId = (userID) => {
  const queryString = `
  SELECT title, description, numops
  FROM polls
  WHERE user_id = $1;`;
  const queryParams = [userID];
  return db.query(queryString, queryParams)
    .then((response) => response.rows)
    .catch(e => console.log(e));
};
//gets options for the poll specified by poll id
const getOptionsByPollId = (req) => {
  const queryString = `
  SELECT o.id, o.poll_id, o.choice, p.title, p.description
  FROM options as o INNER JOIN polls as p
  ON o.poll_id = p.id
  WHERE o.poll_id = $1;`;
  const queryParams = [req.poll_id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows)
    .catch(e => console.log(e));
};

//gets options for the poll specified by poll id
const displayOptionsByPollId = (req) => {
  const queryString = `
  SELECT * FROM options
  WHERE poll_id = $1;`;
  const queryParams = [req.poll_id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows)
    .catch(e => console.log(e));
};

const updatePollOptionsById = (id, choice) => {
  const queryString = `
  UPDATE options
  SET choice = $2
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [id, choice];
  return db.query(queryString, queryParams)
    .catch(e => console.log(e));
};

const updatePollById = (p, req) => {
  const queryString = `
  UPDATE polls
  SET title = $1, description = $2
  WHERE id = $3
  RETURNING *;`;
  const queryParams = [p.title, p.desc, req.poll_id];
  return db.query(queryString, queryParams)
    .catch(e => console.log(e));
};

const displayTitleByPollId = (req) => {
  const id = Number(req.poll_id);
  const queryString = `
  SELECT title, description FROM polls
  WHERE id = $1;`;
  const queryParams = [id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows[0])
    .catch(e => console.log(e));
};

const deletePollById = (id) => {
  const queryString = `
  DELETE FROM polls
  WHERE poll.id = $1;`;
  const queryParams = id;
  return db.query(queryString)
    .then((response) => response.rows)
    .catch(e => console.log(e));
};

const getNumOps = (id) => {
  const queryString = `
  SELECT numops
  FROM polls
  WHERE id = $1;`;
  const queryParams = [id];
  return db.query(queryString, queryParams)
    .then((res) => res.rows[0].numops);
};

module.exports = {
  getPollsByUserId,
  getOptionsByPollId,
  displayOptionsByPollId,
  updatePollOptionsById,
  updatePollById,
  deletePollById,
  displayTitleByPollId,
  getNumOps
};
