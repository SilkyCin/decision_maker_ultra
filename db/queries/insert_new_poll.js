const db = require('../db');
//Inserts the user_id, title and description of a new poll
const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (title, description, numOps)
  VALUES ($1, $2, $3)
  RETURNING *;`;
  const queryParams = [newPoll.title, newPoll.desc, newPoll.nums]
  return db.query(queryString, queryParams)
  .then((res) => {
      return res.rows;
  })
  .catch(er => console.log('ERROR',er));
};
//Inserts the admin_url and voting_url
const updateURLs = (req) => {
  const queryString = `
  UPDATE polls
  SET admin_url = '/poll/${req.poll_id}', voting_url = '/vote/${req.poll_id}'
  WHERE id = ${req.poll_id}
  RETURNING *;`;
  return db.query(queryString)
  .then((res) => {
    return res.rows;
  })
  .catch(e => console.log(e))
}
//Inserts options one at a time into the options table
const insertOptions = (op, req) => {
  const queryString = `INSERT INTO options (poll_id, choice)
  VALUES ($1, $2)`;
  const queryParams = [req, op];
  return db.query(queryString, queryParams)
  .catch(e => console.log(e));
}
module.exports = {
  insertNewPoll,
  updateURLs,
  insertOptions
};
