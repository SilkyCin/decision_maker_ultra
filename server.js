// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

app.set("view engine", "ejs");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['crypto', 'mining is', 'awesome']
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

const homeRoutes = require('./routes/home_routes.js');
const pollRoutes = require('./routes/poll_routes.js');
const adminRoutes = require('./routes/admin_routes.js');
const voteRoutes = require('./routes/vote_routes.js');
const resultRoutes = require('./routes/result_routes.js');

app.use('/', homeRoutes);
app.use('/poll', pollRoutes);
app.use('/admin', adminRoutes);
app.use('/vote', voteRoutes);
app.use('/results', resultRoutes);
//app.use('results/:poll_id', resultRoutes);
app.use('/vote/:poll_id/results', resultRoutes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
