const express = require('express');
const router = express.Router({ mergeParams: true });
const { getOptionsByPollId, updatePollOptionsById, updatePollById } = require('../db/queries/poll_queries.js');

//update poll fields and options
router.post('/:u_id/:poll_id', (req, res) => {
  const data = req.body;
  const pollData = {title : data.title, desc : data.desc};
  delete data.title;
  delete data.desc;
  const opsData = data;
  let complete1 = 0;
  let complete2 = 0;
  updatePollById(pollData, req.params)
    .then((resp) => {
      complete2 += 1;
      for (let i in opsData) {
        updatePollOptionsById(i, opsData[i])
          .then((resp) => {
            complete1 += 1;
          })
          .catch(e => res.send(e));
      }
      res.redirect('/admin/' + req.params.u_id + '/' + req.params.poll_id);
    })
    .catch(e => res.send(e));
});

//endpoint for handling GETs received at the admin URL, AKA /admin/:u_id/:poll_id
router.get('/:u_id/:poll_id', (req, res) => {
  return getOptionsByPollId(req.params)
      .then((results) => {
        const userObj = {email : req.session.email, id : req.params.u_id };
        const templateVars = {user : userObj, poll_id : req.params.poll_id, results : results};
        res.render('update_poll', templateVars);
      })
    .catch(e => res.send(e));
});

module.exports = router;
