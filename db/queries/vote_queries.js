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
    SELECT o.choice, sum(v.priority)
    FROM votes AS v INNER JOIN polls AS p
    ON p.id = v.poll_id INNER JOIN options AS o
    ON v.option_id = o.id
    WHERE v.poll_id = $1
    GROUP BY o.choice
    ORDER BY SUM(v.priority)
    LIMIT 1;`
  , [id])
    .then((response) => {
      return response.rows[0];
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
