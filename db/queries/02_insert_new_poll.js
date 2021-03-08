const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const pool = new Pool;


const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (title, description)
  VALUES ($1, $2)
  RETURNING *;`;
  const queryParams = [newPoll.title, newPoll.desc]
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })

}

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
