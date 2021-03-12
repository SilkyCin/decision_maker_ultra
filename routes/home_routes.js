const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const { insertNewUser } = require('../db/queries/user_queries.js');


//endpoint to allow users to create a user profile
router.post('/login', (req, res) => {
  let userObj;
  const newUser = req.body;
  return insertNewUser(newUser)
    .then((results) => {
      req.session.email = results[0].email;
      req.session.user_id = results[0].id;
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj};
      // res.render('user_polls', templateVars);
      res.redirect('/poll');
    })
    .catch(er => console.log('ERROR',er));
});


//endpoint for allowing users to log out of their accounts
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

//endpoint to handle GETs received at /
router.get("/", (req, res) => {
  let userObj;
  if ((req.session && req.session.email)) {
    userObj = {email : req.session.email, id : req.session.user_id };
    const templateVars = {user : userObj};
    res.render('index', templateVars);
    return;
  }
  const templateVars = {user : userObj};
  res.render('index', templateVars);
  return;
});

//handles Get requests received at '/login'
router.get('/login', (req, res) => {
  let userObj;
  let message;
  if ((req.session && req.session.user_id)) {
    userObj = {email : req.session.email, id : req.session.user_id };
    const templateVars = {user : userObj};
    res.render('index', templateVars);
    return;
  }
  const templateVars = { user: userObj, messsage: message };
  res.render('login', templateVars);
});

module.exports = router;
