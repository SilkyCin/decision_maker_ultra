const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

const { insertNewUser } = require('../db/queries/user_queries.js');


router.get("/", (req, res) => {
  // if (req.session && req.session.user_id) {
  //   return true;
  // }
  // return false;
  let userObj;
  if (!(req.session && req.session.email)) {

    const templateVars = {user : userObj};
    res.render('index', templateVars);
    return;
    // res.status(403).send('<h3>You must be logged in  </h3>');
    // return;
  }
  const templateVars = {user : userObj};
  res.render('index', templateVars);
  return;


  // let u_id = req.session.email;
  // userObj = users[u_id];
  // const urlsByUser = urlsForUser(u_id, urlDatabase);
  // const templateVars = { urls: urlsByUser, user: userObj };
  // res.render("index", templateVars);
});

//endpoint to allow users to create a user profile
router.post('/', (req, res) => {

  //res.redirect('/poll');

  const newUser = req.body;
  console.log(newUser);
  return insertNewUser(newUser)
  .then((results) => {
    req.session.email = results[0].email;
    console.log(results);
    console.log(req.session.email);
    res.redirect(`/poll/${results[0].id}`);
  })
  .catch(er => console.log('ERROR',er))

});

//endpoint for allowing users to log out of their accounts
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});



module.exports = router;
