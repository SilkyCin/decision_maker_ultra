const express = require('express');
const router = express.Router();
const { displayOptionsByPollId } = require('../db/queries/poll_queries');
const { storeResultsByPollId } = require('../db/queries/vote_queries');
const { getResultsByPollId } = require('../db/queries/vote_queries');

// get the poll needed to be voted on
router.get('/:poll_id', (req, res) => {


  displayOptionsByPollId(req.params)
    .then((options) => {
      // console.log(options);
    //  let userObj;
      const templateVars = {ops : options, p_id : req.params.poll_id };
      // console.log(templateVars);
      res.render('vote_page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

});



router.get('/:poll_id/results', (req, res) => {

  getResultsByPollId(req.params.poll_id)
  .then((results) => {
    let sum = 0;
    let percentArr = [];
    for (const result of results) {
      sum += Number(result.points_per_choice);
    }
    console.log("res", results)
    for (const result of results) {
      let percent = (result.points_per_choice/sum *100).toFixed(2);
        let resultObj = { ...result, percent };
        percentArr.push(resultObj);
    }

    let userObj;
    if (!(req.session && req.session.email)) {
      const templateVars = {
      user : userObj,
      results: percentArr
    };
      // res.render('index', templateVars);
    // return;
    // res.status(403).send('<h3>You must be logged in  </h3>');
    // return;
    }
  const templateVars = {
    user : userObj,
    results: percentArr
  };
      // console.log("percentArr: ", percentArr)
      // passing object with value percentArr to be rendered on page
      res.render('result_page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

//Loops through votes and sends promise for each vote
router.post('/:poll_id', (req, res) => {
  let votes = req.body;
  const id = Number(req.params.poll_id);
  for (let optionID in votes) {
    const pri = Number(votes[optionID])
    optionID = Number(optionID);
    if (!isNaN(optionID) && !isNaN(pri)) {
      const queryParams = [id, optionID, pri, votes.guest_name];
      storeResultsByPollId(queryParams)
        .catch(e => res.send(e))
    }
  }
  res.redirect(`/vote/${id}/results`);
});



module.exports = router;
