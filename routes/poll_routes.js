const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('create_poll')
});

router.get('/:poll_id', (req, res) => {
  res.render('vote_page')
});


router.post('/', (req, res) => {
  const body = req.body;
  console.log("BODY", body);
  res.redirect('/')
});

module.exports = router;
