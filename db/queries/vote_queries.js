const db = require('../db');

// show what votes each choice in a poll received
const getVotesByPollId = (id) => {
  return db.query(`
    SELECT priority
    FROM votes
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    WHERE poll_id = $1;
    GROUP BY choice`
  , [id])
    .then((response) => {
      return response.rows[0];
    });
};

// show the results of one poll
// ************this function is incomplete************
// this is where we will need to calculate results using the Borda Count method
const getResultsByPollId = (id) => {
  return db.query(`
  SELECT choice, sum((select count(choice) from options where poll_id = $1) - priority) as total_points
  FROM votes
  JOIN polls on votes.poll_id = polls.id
  JOIN options on option_id = options.id
  WHERE votes.poll_id = $1
  GROUP BY choice
  ORDER BY total_points;`
  , [id])
    .then((response) => {
      return response.rows;
    });
};

// (stretch) show the results of all polls created by one user
const getAllPollResultsbyUserId = () => {

};

module.exports = {
  getVotesByPollId,
  getResultsByPollId,
  getAllPollResultsbyUserId
};
