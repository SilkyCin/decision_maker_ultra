const db = require('../db');

const getNumOps = (id) => {
  const queryString = `
  SELECT numops
  FROM polls
  WHERE id = $1;`;
  const queryParams = [id]
  return db.query(queryString, queryParams)
  .then((res) => res.rows[0].numops);
};

//Inserts the user_id, title and description of a new poll
const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (user_id, title, description, numOps)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  const queryParams = [newPoll.user_id, newPoll.title, newPoll.desc, newPoll.nums];
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
  SET admin_url = $1, voting_url = $2
  WHERE id = $3
  RETURNING *;`;
  const queryParams = [`/admin/${req.u_id}/${req.poll_id}`, `/vote/${req.poll_id}`, req.poll_id];
  return db.query(queryString, queryParams)
  .then((res) => {
    return res.rows;
  })
  .catch(e => console.log(e));
};

//Inserts options one at a time into the options table
const insertOptions = (data) => {
  const queryString = `
  INSERT INTO options (poll_id, choice)
  VALUES ($1, $2)
  RETURNING *`;
  const queryParams = [data.poll_id, data.choice];
  return db.query(queryString, queryParams)
  .catch(e => console.log(e));
};


module.exports = {
  insertNewPoll,
  updateURLs,
  insertOptions,
  getNumOps
};
