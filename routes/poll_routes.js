require('dotenv').config();
const express = require('express');
const router = express.Router({ mergeParams: true });
const { insertNewPoll, updateURLs, insertOptions, dispPollsByUserEmail } = require('../db/queries/poll_queries.js');
const { getUserDetailsByPollId, getUser } = require('../db/queries/user_queries.js');
const { sendMail } = require('../helpers/helpers.js');

// USER POLLS
//endpoint to handle GETs received at /
router.get("/", (req, res) => {
  let userObj;
  if ((req.session && req.session.email)) {
    return dispPollsByUserEmail(req.session.email)
      .then((response) => {
        console.log("response: ", response)
        userObj = {email : req.session.email, id : req.session.user_id };
        const templateVars = {user : userObj, pData : response};
        res.render('user_polls', templateVars);
      })
      .catch(e => res.send(e));
  }
  res.status(403).send('<h3>You must be logged in to view this page</h3>');
  return;
});

// CREATE POLLS
// Loads the create poll page
router.get('/:u_id', (req, res) => {
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id)) {
    res.status(403).send('<h3>You must be logged in to view this page</h3>');
    return;
  }
  return getUser(req.params.u_id)
    .then((resp) => {
      const templateVars = {user : resp};
      res.render('create_poll', templateVars);
    })
    .catch(er => console.log('ERROR',er));
});

//add user provided info into polls table in database
router.post('/:u_id', (req, res) => {
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id)) {
    res.status(403).send('<h3>You must be logged in to view this page</h3>');
    return;
  }
  const newPoll = {user_id: req.params.u_id, title: req.body.title, desc: req.body.desc, nums: req.body.nums};
  return insertNewPoll(newPoll)
    .then(poll => {
      req.session.poll_id = poll[0].id;
      res.redirect(`/poll/${poll[0].user_id}/${poll[0].id}`);
    })
    .catch(e => res.send(e));
});

// CREATE POLL OPTIONS
//Renders page where the user enters options into poll
router.get('/:u_id/:poll_id', (req, res) => {
  let userObj;
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in and have an active poll id to view this page</h3>');
    return;
  }
  return updateURLs(req.params)
    .then((results) => {
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user: userObj, poll_id: req.params.poll_id, opNum : results[0].numops};
      res.render('admin_poll', templateVars);
    })
    .catch(e => res.send(e));
});

module.exports = router;


//stores options into options table in database
router.post('/:u_id/:poll_id', (req, res) => {
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in and have an active poll id to view this page</h3>');
    return;
  }
  const ops = req.body;
  for (let op in ops) {
    let data = {choice : ops[op], poll_id : req.params.poll_id};
    insertOptions(data)
    .catch(e => res.send(e));
  }

  return getUserDetailsByPollId(req.params)
    .then((resp) => {
      const links = {admin : resp.rows[0].admin_url, voting : resp.rows[0].voting_url};
      sendMail(resp.rows[0].email, resp.rows[0].name, links);
      res.json('Done!');
    })
    .catch(e => res.send(e));
});
