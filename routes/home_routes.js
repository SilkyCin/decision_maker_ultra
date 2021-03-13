const express = require('express');
const router = express.Router();
require('dotenv').config();

const { insertNewUser } = require('../db/queries/user_queries.js');
const { dispPollsByUserEmail } = require('../db/queries/poll_queries.js');

// LOGIN ROUTES
//handles get requests received at '/login'
router.get('/login', (req, res) => {
  let userObj;
  let message = "";
  if ((req.session && req.session.user_id)) {
    return dispPollsByUserEmail(req.session.email)
      .then((response) => {
        userObj = {email : req.session.email, id : req.session.user_id };
        const templateVars = {user : userObj, pData : response.rows};
        res.render('index', templateVars);
      })
      .catch(e => res.send(e));
  }
  const templateVars = { user: userObj, message: message };
  res.render('login', templateVars);
});

//endpoint to allow users to create a user profile
router.post('/login', (req, res) => {
  let message = "";
  let userObj;
  const newUser = req.body;
  if (newUser['email'].trim() === "") {
    message = "Entering a valid email is mandatory";
    const templateVars = { user: userObj, message: message };
    res.redirect('/poll', templateVars);
    return;
  }
  return insertNewUser(newUser)
    .then((results) => {
      req.session.email = results[0].email;
      req.session.user_id = results[0].id;
      return dispPollsByUserEmail(results[0].email)
        .then((response) => {
          userObj = {email : req.session.email, id : req.session.user_id };
          const templateVars = {user : userObj, pData : response.rows};
          res.render('index', templateVars);
        })
        .catch(e => res.send(e));
    })
    .catch(e => res.send(e));

});


// LOGOUT ROUTES
//endpoint to handle a GET at /logout
router.get('/logout', (req, res) => {
  res.status(403).send('<h3> Please turn around and go back to where you came from. </h3>');
});

//endpoint for allowing users to log out of their accounts
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


// LANDING PAGE
//endpoint to handle GETs received at /
router.get("/", (req, res) => {
  let userObj;
  let pD = [];
  if ((req.session && req.session.email)) {
    return dispPollsByUserEmail(req.session.email)
      .then((response) => {
        console.log(response.rows);
        userObj = {email : req.session.email, id : req.session.user_id };
        const templateVars = {user : userObj, pData : response.rows};
        res.render('index', templateVars);
      })
      .catch(e => res.send(e));
  }
  const templateVars = {user : userObj, pData : pD};
  res.render('index', templateVars);
  return;
});



module.exports = router;
