// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

app.set("view engine", "ejs");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

const homeRoutes = require('./routes/home_routes.js');
const voteRoutes = require('./routes/vote_routes.js');
const pollRoutes = require('./routes/poll_routes.js');
const resultRoutes = require('./routes/result_routes.js');

app.use('/', homeRoutes);
app.use('/vote/:poll_id', voteRoutes);
app.use('/poll', pollRoutes);
// app.use('/poll/:poll_id', pollRoutes);
app.use('results/:poll_id', resultRoutes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
