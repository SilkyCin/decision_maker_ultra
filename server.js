// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  //res.render("index");
  res.render("index");
});


// render page to create new poll
app.get("/poll", (req, res) => {
  res.render("create_poll");
});

// post new poll
app.post('/poll', (req, res) => {

  res.redirect(`/poll/${poll_id}`)
  // res.redirect("/poll/:poll_id") poll id to be replaced with poll id from req.session
});


// VOTE ON POLL
// render page where you submit your vote
app.get('/vote/:poll_id', (req, res) => {

  const poll_id = req.params.poll_id;
  console.log(poll_id);
  const templateVars = { p_id : poll_id }
  res.render("poll_page", templateVars);

});

// submit vote in poll
app.post("/vote", (req, res) => {
  //res.render("index");

  let op1 = req.body.op1;
  let op2 = req.body.op2;
  let op3 = req.body.op3;
  let op4 = req.body.op4;

  console.log(op1)
  console.log(op2)
  console.log(op3)
  console.log(op4)


  res.redirect('/results/:poll_id')

});

//Get Poll Results
app.get('/results/:poll_id', (req, res) => {
  res.render("results", templateVars)
});


// Edit a poll
app.get('/poll/:poll_id', (req, res) => {
  const templateVars = {};
  res.render('admin_poll', templateVars)
});


//Delete a poll
app.post("/vote/:poll_id/delete", (req, res) => {
  res.redirect('/')
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
