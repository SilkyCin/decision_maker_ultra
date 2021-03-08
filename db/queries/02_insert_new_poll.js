const db = require('../db');

//Inserts the user_id, title and description of a new poll
const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (user_id, title, description)
  VALUES ($1, $2)
  RETURNING *;`;
  const queryParams = [newPoll.title, newPoll.desc]
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
}

//
const updateURLs = () => {
  const queryString = `
  UPDATE polls
  SET admin_url = '/poll/$1', voting_url = '/vote/$1'
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [poll_id]; //Do not have access to this yet
  return pool.query(queryString, queryParams)
    .then((res) => {
   return res.rows;
    })
}

const insertOptions = (newPoll) => {
  const queryString = `INSERT INTO options (poll_id, choice)
  VALUES ($1, $2)`;
  const queryParams = [newPoll.poll_id, newPoll.choice];
  return pool.query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows)
      return res.rows;
    })
}
module.exports = { insertNewPoll,
updateURLs, insertOptions };
