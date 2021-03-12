const db = require('../db');

// Show what votes each choice in a poll received
const getVotesByPollId = (pollID) => {
  const queryString = `
  SELECT priority
  FROM votes
  JOIN polls ON poll_id = polls.id
  JOIN options ON option_id = options.id
  WHERE poll_id = $1;
  GROUP BY choice;`;
  const queryParams = [pollID];
  return db.query(queryString, queryParams)
    .then((response) => response.rows[0])
    .catch(e => console.log(e));
};

// Show the results of one poll using the Borda Count tournament style ranking method
const getResultsByPollId = (pollID) => {
  const id = Number(pollID);
  const queryString = `
  SELECT choice, sum((select count(choice) from options where poll_id = $1)-priority) as points_per_choice
  FROM votes
  JOIN options on options.id = votes.option_id
  WHERE options.poll_id = $1
  GROUP BY choice
  order by points_per_choice DESC;`;
  const queryParams = [id];
  return db.query(queryString, queryParams)
    .then((response) => response.rows)
    .catch(e => console.log(e));
};

// Inserting new votes
const storeResultsByPollId = (pollID) => {
  const queryString =  `
  INSERT INTO votes (poll_id, option_id, priority, guest_name)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`;
  const queryParams = pollID;
  return db.query(queryString, queryParams)
    .then((response) => response)
    .catch(e => console.log(e));
};

// (stretch) show the results of all polls created by one user
const getAllPollResultsbyUserId = (id) => {

};

module.exports = {
  getVotesByPollId,
  getResultsByPollId,
  getAllPollResultsbyUserId,
  storeResultsByPollId
};
