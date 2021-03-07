const express = require('express');
const router = express.Router();


router.get('/:poll_id', (req, res) => {
  res.render('result_page')
});


module.exports = router;
