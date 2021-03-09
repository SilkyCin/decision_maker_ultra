const express = require('express');
const router = express.Router();
const { insertNewPoll,
  updateURLs, insertOptions } = require('../db/queries/02_insert_new_poll.js')


router.get('/', (req, res) => {
  res.render('create_poll')
});

//Renders admin_poll page where the user enters their options
router.get('/:poll_id', (req, res) => {
  return updateURLs(req.params)
  .then(id => console.log(id))
  .then(res.render('admin_poll'))
  .catch(er => console.log('ERROR',er))
});

//User enters title and description of poll, redirects to poll/:id after storing poll in db
router.post('/', (req, res) => {
  const newPoll = req.body;
  return insertNewPoll(newPoll)
  .then(poll => res.redirect(`/poll/${poll[0].id}`))
  .catch(er => console.log('ERROR',er))
});

//Posts the entered options
router.post('/:poll_id', (req, res) => {
  const options = req.body;

  for (let i = 1; i < 10; i++) {
    console.log("Hi:",req.params)
    const op = `op${i}`;
    if (options[op]) {
      console.log("True", options[op]);
      return insertOptions(options[op], req.params)
      .then(x => console.log("Inserted Option:", x))
      .catch(e => console.log(e))
    }
    if (!options[op]) {
      console.log("False", options[op]);
      // return insertOptions(options[op])
    }
  }
});



module.exports = router;
