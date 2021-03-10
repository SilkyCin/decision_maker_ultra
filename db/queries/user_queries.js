const db = require('../db');
//Inserts the user email and name into a users table
const insertNewUser = (newUser) => {
  const queryString = `
  INSERT INTO users (name, email)
  VALUES ($1, $2)
  RETURNING *;`;
  const queryParams = [newUser.name, newUser.email]
  return db.query(queryString, queryParams)
  .then((res) => {
      return res.rows;
  })
  .catch(er => console.log('ERROR',er));
};

const getUser = (id) => {
  const queryString = `
  SELECT * FROM users
  WHERE id = $1;`;
  const queryParams = [id]
  return db.query(queryString, queryParams)
  .then((res) => {
      return res.rows[0];
  })
  .catch(er => console.log('ERROR',er));
};

module.exports = {
  insertNewUser,
  getUser

};
