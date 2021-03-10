const db = require('../db');

const getPolls = () => {

};

const getOptionsByPollId = (id) => {
  return db.query(`
  SELECT *
  FROM options
  WHERE poll_id = $1;`
, [id])
  .then((response) => {
    return response.rows;
  });
};

const getPollByUserId = (id) => {


};


module.exports = {
  getPolls,
  getOptionsByPollId,
  getPollByUserId
};
