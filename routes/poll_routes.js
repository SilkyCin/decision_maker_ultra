const express = require('express');
const router = express.Router();
const { insertNewPoll,
  updateURLs, insertOptions } = require('../db/queries/02_insert_new_poll.js')


router.get('/', (req, res) => {
  res.render('create_poll')
});

router.get('/:poll_id', (req, res) => {
  res.render('vote_page')
});


router.post('/', (req, res) => {
  const newPoll = req.body;
  return insertNewPoll(newPoll)
  .then(res => console.log('res',res.rows))
  .catch(er => console.log('ERROR',er))
  .finally(res.redirect('/poll/:id'))
});

module.exports = router;
