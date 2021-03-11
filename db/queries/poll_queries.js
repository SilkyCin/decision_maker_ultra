const db = require('../db');

const getPollsByUserId = (req) => {
  return db.query(`
  SELECT title, description, numops
  FROM polls
  WHERE user_id = $1;`
  , [req.user_id])
    .then((response) => {
      return response.rows;
    });
};

//gets options for the poll specified by poll id
const getOptionsByPollId = (req) => {
  return db.query(`
  SELECT o.id, o.poll_id, o.choice, p.title, p.description
  FROM options as o INNER JOIN polls as p
  ON o.poll_id = p.id
  WHERE o.poll_id = $1;`
  , [req.poll_id])
    .then((response) => {
      return response.rows;
    });
};

//gets options for the poll specified by poll id
const displayOptionsByPollId = (req) => {
  return db.query(`
  SELECT * FROM options
  WHERE poll_id = $1;`
  , [req.poll_id])
    .then((response) => {
      return response.rows;
    });
};

const updatePollOptionsById = (id, choice) => {
  return db.query(`
  UPDATE options
  SET choice = $2
  WHERE id = $1
  RETURNING *;`
  , [id, choice]);
};

const updatePollById = (p, req) => {
  return db.query(`
  UPDATE polls
  SET title = $1, description = $2
  WHERE id = $3
  RETURNING *;`
  , [p.title, p.desc, req.poll_id]);
};

const displayTitleByPollId = (req) => {
  const id = Number(req.poll_id);
  // console.log("monkeyfuzz:", req);

  return db.query(`
  SELECT title, description FROM polls
  WHERE id = $1;`
  , [id])
    .then((response) => response.rows[0])
    .catch((e) => console.log(e));
};


module.exports = {
  getPollsByUserId,
  getOptionsByPollId,
  updatePollOptionsById,
  updatePollById,
  displayOptionsByPollId,
  displayTitleByPollId
};
