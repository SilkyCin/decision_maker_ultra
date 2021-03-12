const express = require('express');
const router = express.Router({ mergeParams: true });
const { getOptionsByPollId, updatePollOptionsById, updatePollById, deletePollById } = require('../db/queries/poll_queries.js');

// update poll fields
router.post('/:u_id/:poll_id', (req, res) => {
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in as the admin and have an active poll id.</h3>');
    return;
  }
  const data = req.body;
  const pollData = {title : data.title, desc : data.desc};
  delete data.title;
  delete data.desc;
  const opsData = data;
  for (let i in opsData) {
    updatePollOptionsById(i, opsData[i])
      .then((response) => response.rows)
      .catch(e => res.send(e));
  }
  updatePollById(pollData, req.params)
    .then((response) => response.rows)
    .catch(e => res.send(e));
});

// page to update your poll
router.get('/:u_id/:poll_id', (req, res) => {
  let userObj;
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in as the admin and have an active poll id.</h3>');
    return;
  }
  return getOptionsByPollId(req.params)
    .then((response) => {
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, poll_id : req.params.poll_id, results : response};
      res.render('update_poll', templateVars);
    })
    .catch(e => res.send(e));
});

// delete polls from database
router.post('/:u_id/:poll_id/delete', (req, res) => {
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged into access this feature</h3>');
    return;
  }
  return deletePollById(req.params.poll_id)
    .then(() => res.redirect('/poll'))
    .catch(e => res.send(e));
});

//endpoint for handling GETs received at the admin URL, AKA /admin/:u_id/:poll_id
router.get('/:u_id/:poll_id', (req, res) => {
  let userObj;
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in as the admin and have an active poll id.</h3>');
    return;
  }
  return getOptionsByPollId(req.params)
    .then((results) => {
      userObj = {email : req.session.email, id : req.session.user_id };
      const templateVars = {user : userObj, poll_id : req.params.poll_id, results : results};
      res.render('update_poll', templateVars);
    })
    .catch(e => res.send(e));
});

module.exports = router;
