const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');

const { insertNewUser } = require('../db/queries/user_queries.js');


//endpoint to allow users to create a user profile
router.post('/login', (req, res) => {

  const newUser = req.body;
  // console.log(newUser);
  return insertNewUser(newUser)
  .then((results) => {
    req.session.email = results[0].email;
    req.session.user_id = results[0].id;
    // console.log(req.session.user_id);
    // console.log("bubub");
    // console.log(results);
    // console.log(req.session.email);
    userObj = {email : req.session.email, id : req.session.user_id };
    const templateVars = {user : userObj};
    res.render('index', templateVars);
    //res.redirect(`/poll/${results[0].id}`);
  })
  .catch(er => console.log('ERROR',er))

});


// //endpoint for handling users who want to sign in to an account
// router.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const hashedPassword = getUsersPassword(email, users);
//   if (!checkIfUserExist(email, users)) {
//     res.status(403).send(`No user found with email id: ${email}. Please enter correct email`);
//     return;
//   }
//   if (!bcrypt.compareSync(password, hashedPassword)) {
//     res.status(403).send('Passwords do not match. Please enter the correct password.');
//     return;
//   }
//   const u_id = getUserByEmail(email, users);
//   req.session.user_id = u_id;
//   res.redirect('/urls/');
// });

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
    // res.status(403).send('<h3>You must be logged in  </h3>');
    // return;
  }
  const templateVars = {user : userObj};
  res.render('index', templateVars);
  return;
});

//endpoint to handle GETs received at /
router.get("/poll", (req, res) => {

  let userObj;
  if ((req.session && req.session.email)) {
    userObj = {email : req.session.email, id : req.session.user_id };
    const templateVars = {user : userObj};
    res.render('index', templateVars);
    return;
    // res.status(403).send('<h3>You must be logged in  </h3>');
    // return;
  }

  res.status(403).send('<h3>You must be logged in  </h3>');
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
