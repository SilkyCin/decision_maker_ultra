const express = require('express');
const router = express.Router();
const { getOptionsByPollId } = require('../db/queries/poll_queries');
const { storeResultsByPollId } = require('../db/queries/vote_queries');
//const { getResultsByPollId } = require('../db/queries/vote_queries');

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

router.post('/:poll_id', (req, res) => {
  console.log(req.body)
  storeResultsByPollId(req.params.poll_id, req.body)
    .then((ins) => {


    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

});


// //get results from a vote
// router.get('/', (req, res) => {
//   getResultsByPollId(req.params.id)
//     .then((results) => {
//       res.json(results); //will likely want to change to res.render once pages are set up
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e);
//     });
//   res.render('vote_page');
// });


module.exports = router;
