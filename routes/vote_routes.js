const express = require('express');
const router = express.Router();
const { getPollById } = require('../db/queries/poll-queries');
const { getVotesByPollId } = require('../db/queries/vote-queries');

// get the poll needed to be voted on
router.get('/:poll_id', (req, res) => {
  res.render('vote_page');
});


//get the results from the vote
router.get('/', (req, res) => {
  res.render('/results/:poll_id');
});


module.exports = router;
