const express = require('express');
const router = express.Router();
const { getResultsByPollId } = require('../db/queries/vote_queries');

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
        let percent = (result.total_points / sum * 100).toFixed(2);
        let resultObj = { ...result, percent };
        percentArr.push(resultObj);
      }
      res.render('result_page', {results: percentArr});
    })
    .catch(e => res.send(e));
});

module.exports = router;
