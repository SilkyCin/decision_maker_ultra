const express = require('express');
const router = express.Router();
const { getOptionsByPollId } = require('../db/queries/poll_queries');
const { storeResultsByPollId } = require('../db/queries/vote_queries');
const { getResultsByPollId } = require('../db/queries/vote_queries');

// get the poll needed to be voted on
router.get('/:poll_id', (req, res) => {
  getOptionsByPollId(req.params.poll_id)
    .then((options) => {
      console.log(options);
      const templateVars = {ops : options, p_id : req.params.poll_id};
      console.log(templateVars);
      res.render('vote_page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

});

//get results from a vote
router.get('/:poll_id/results', (req, res) => {
  getResultsByPollId(req.params.poll_id)
    .then((results) => {
      let sum = 0;
      let percentArr = [];

      for (const result of results) {
        sum += Number(result.total_points);
      }

      for (const result of results) {
        let percent = (result.total_points/sum *100).toFixed(2);
        let resultObj = { ...result, percent };
        percentArr.push(resultObj);
      }

      console.log("percentArr: ", percentArr)
      // passing object with value percentArr to be rendered on page
      res.render('vote_page', {results: percentArr}); //will likely want to change to res.render once pages are set up
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/:poll_id', (req, res) => {
  console.log(req.body)
  storeResultsByPollId(req.params.poll_id, req.body)
    .then((ins) => {});
});



module.exports = router;
