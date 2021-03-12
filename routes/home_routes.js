const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
require('dotenv').config();

const { insertNewUser } = require('../db/queries/user_queries.js');
const { dispPolls } = require('../db/queries/poll_queries.js');

//endpoint to allow users to create a user profile
router.post('/login', (req, res) => {

  let message = "";
  let userObj;
  const newUser = req.body;
  if (newUser['email'].trim() === "") {
    message = "Entering a valid email is mandatory";
    const templateVars = { user: userObj, message: message };
    res.render('login', templateVars);
    return;
  }
  // console.log(newUser);
  return insertNewUser(newUser)
  .then((results) => {
    req.session.email = results[0].email;
    req.session.user_id = results[0].id;
    console.log(req.session.user_id);
    console.log("bubadwecqweub");
    console.log(results);
    console.log(req.session.email);
    return dispPolls(results[0].email)
    .then((response) => {
      console.log("iiiii");
      console.log(response.rows);
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, pData : response.rows};
      res.render('index', templateVars);
    })
    .catch((e) => console.log('ERROR', e));
  })
  .catch(er => console.log('ERROR',er))

});


//endpoint for allowing users to log out of their accounts
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


//endpoint to handle a GET at /logout
router.get('/logout', (req, res) => {
  res.status(403).send('<h3> Please turn around and go back to where you came from. </h3>');
});

//endpoint to handle GETs received at /
router.get("/", (req, res) => {
  let userObj;
  let pD = [];
  if ((req.session && req.session.email)) {

    return dispPolls(req.session.email)
    .then((response) => {
      console.log("iiiii");
      console.log(response.rows);
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, pData : response.rows};
      res.render('index', templateVars);
    })
    .catch((e) => console.log('ERROR', e));


    //tbridw
    // userObj = {email : req.session.email, id : req.session.user_id };
    // const templateVars = {user : userObj};
    // res.render('index', templateVars);
    // return;
    // res.status(403).send('<h3>You must be logged in  </h3>');
    // return;
  }

  const templateVars = {user : userObj, pData : pD};
  res.render('index', templateVars);
  return;
});


//handles Get requests received at '/login'
router.get('/login', (req, res) => {
  let userObj;
  let message = "";
  let pD = [];
  if ((req.session && req.session.user_id)) {



    return dispPolls(req.session.email)
    .then((response) => {
      console.log("iiiii");
      console.log(response.rows);
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, pData : response.rows};
      res.render('index', templateVars);
    })
    .catch((e) => console.log('ERROR', e));

    //tbridw
    // userObj = {email : req.session.email, id : req.session.user_id };
    // const templateVars = {user : userObj};
    // res.render('index', templateVars);
    // return;
  }
  const templateVars = { user: userObj, message: message };
  res.render('login', templateVars);
});


//endpoint to handle GETs received at /
router.get("/poll", (req, res) => {

  let userObj;
  let pD = [];
  if ((req.session && req.session.email)) {

    return dispPolls(req.session.email)
    .then((response) => {
      console.log("iiiii");
      console.log(response.rows);
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, pData : response.rows};
      res.render('index', templateVars);
    })
    .catch((e) => console.log('ERROR', e));

    //tbridw
    // userObj = {email : req.session.email, id : req.session.user_id };
    // const templateVars = {user : userObj};
    // res.render('index', templateVars);
    // return;

  }

  res.status(403).send('<h3>You must be logged in  </h3>');
  return;
});




module.exports = router;
