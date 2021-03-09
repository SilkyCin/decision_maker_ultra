const express = require('express');
const router = express.Router();
const { insertNewPoll,
  updateURLs, insertOptions } = require('../db/queries/02_insert_new_poll.js')


router.get('/', (req, res) => {
  res.render('create_poll')
});

router.get('/:poll_id', (req, res) => {
  console.log(req.params.poll_id);
  res.render('vote_routes')
});


router.post('/', (req, res) => {
  const newPoll = req.body;
 // console.log(newPoll);
  return insertNewPoll(newPoll)
  .then(res => console.log('res',res.rows))
  .catch(er => console.log('ERROR',er))
  .finally(res.redirect('/poll'))
});

router.post('/:poll_id', (req, res) => {
  console.log(req.params.poll_id);

});


module.exports = router;
