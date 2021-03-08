const express = require('express');
const router = express.Router();
const { getOptionsByPollId } = require('../db/queries/poll_queries');
const { getResultsByPollId } = require('../db/queries/vote_queries');

// get the poll needed to be voted on
router.get('/:poll_id', (req, res) => {
  getOptionsByPollId(req.params.id)
    .then((polls) => {
      res.json(polls); //will likely want to change to res.render once pages are set up
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  res.render('vote_page');
});


//get results from a vote
router.get('/', (req, res) => {
  getResultsByPollId(req.params.id)
    .then((results) => {
      res.json(results); //will likely want to change to res.render once pages are set up
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  res.render('/results/:poll_id');
});


module.exports = router;
