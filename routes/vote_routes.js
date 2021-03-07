const express = require('express');
const router = express.Router();


router.get('/:poll_id', (req, res) => {
  res.render('vote_page')
});

router.get('/', (req, res) => {
  res.render('/results/:poll_id')
})


module.exports = router;
