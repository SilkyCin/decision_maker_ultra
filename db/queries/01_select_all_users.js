const db = require()

const getAllUsers = () => {
  return dbParams.query('SELECT * FROM users;')
    .then((res) => {
      console.log(res.rows)
      //return res.rows;
    })
}

module.exports = getAllUsers;
