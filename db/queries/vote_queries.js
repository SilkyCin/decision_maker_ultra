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
const getResultsByPollId = (pollID) => {
  const id = Number(pollID);
  return db.query(`
  SELECT choice, sum((select count(choice) from options where poll_id = $1)-priority) as points_per_choice
  FROM votes
  JOIN options on options.id = votes.option_id
  WHERE options.poll_id = $1
  GROUP BY choice
  order by points_per_choice DESC;
`, [id])
  .then((response) => {
    return response.rows;
  });
};


//INSERTING DATA INTO DATABASE
const storeResultsByPollId = (queryParams) => {
  const queryString =  `INSERT INTO votes (poll_id, option_id, priority, guest_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  return db.query(queryString, queryParams)
    .then((response) => {
      return response;
    });
};

// (stretch) show the results of all polls created by one user
const getAllPollResultsbyUserId = () => {

};

module.exports = {
  getVotesByPollId,
  getResultsByPollId,
  getAllPollResultsbyUserId,
  storeResultsByPollId
};
