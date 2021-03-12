const express = require('express');
const router = express.Router({ mergeParams: true });
const { getOptionsByPollId, updatePollOptionsById, updatePollById } = require('../db/queries/poll_queries.js')


router.post('/:u_id/:poll_id', (req, res) => {
  let userObj;
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in as the admin and have an active poll id.</h3>');
    return;
  }

  console.log(req.body);
  const data = req.body;
  const pollData = {title : data.title, desc : data.desc}

  updatePollById(pollData, req.params)
  .then((response) => {
    console.log(response.rows);
    console.log("cvcvcvcv")
  })
  .catch(e => console.log(ERROR, e));
});

router.post('/:u_id/:poll_id/del', (req, res) => {

  console.log(req.body);
  const data = req.body;
  res.json(data);
});

router.post('/:u_id/:poll_id/upd', (req, res) => {

  console.log(req.body);
  const data = req.body;
  res.json(data);
});

//endpoint for handling GETs received at the admin URL, AKA /admin/:u_id/:poll_id
router.get('/:u_id/:poll_id', (req, res) => {
  let userObj;
  if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
    res.status(403).send('<h3>You must be logged in as the admin and have an active poll id.</h3>');
    return;
  }

  return getOptionsByPollId(req.params)
  .then((results) => {

    //console.log(results);
    userObj = {email : req.session.email, id : req.session.user_id };
    const templateVars = {user : userObj, poll_id : req.params.poll_id, results : results};

    res.render('update_poll', templateVars);

  })
  .catch(er => console.log('ERROR',er));
});

  // delete data.title;
  // delete data.desc;
  // const opsData = data;

  // for (let i in opsData) {
  //    console.log(i);
  //    console.log("sd");
  //    updatePollOptionsById(i, opsData[i])
  //    .then((response) => {
  //      console.log(response.rows);
  //      console.log("kmkmkmkm")
  //    })
  //    .catch(e => {
  //      console.log(ERROR, e)
  //    });
  // }




//endpoint to handle post requests to add basic poll info to database
// router.post('/:u_id', (req, res) => {
//   if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id)) {
//     res.status(403).send('<h3>You must be logged in .</h3>');
//     return;
//   }
//   const newPoll = {user_id: req.params.u_id, title: req.body.title, desc: req.body.desc, nums: req.body.nums};
//   console.log(newPoll)

//   return insertNewPoll(newPoll)
//   .then(poll => {
//     req.session.poll_id = poll[0].id;
//     console.log(req.session.user_id);
//     console.log(req.session.poll_id);
//     console.log("xyzyx");
//     res.redirect(`/poll/${poll[0].user_id}/${poll[0].id}`)

//   })
//   .catch(er => console.log('ERROR',er))
// });

// router.post('/:u_id/:poll_id', (req, res) => {
//   if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
//     res.status(403).send('<h3>You must be logged in and have a valid poll id.</h3>');
//     return;
//   }
//   console.log(req.body);
//   const ops = req.body;
//   for (let op in ops) {
//      let data = {choice : ops[op], poll_id : req.params.poll_id}
//      insertOptions(data)
//      .catch(e => console.log(ERROR, e));
//   }
//   //res.redirect()

// });

//endpoint to handle GETs received at /:u_id. loads the create poll page
// router.get('/:u_id', (req, res) => {

//   if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id)) {
//     res.status(403).send('<h3>You must be logged in .....</h3>');
//     return;
//   }
//   return getUser(req.params.u_id)
//   .then((resp) => {
//     console.log("lplplplpl");
//     console.log(resp);
//     console.log(resp['email']);
//     const templateVars = {user : resp};
//     res.render('create_poll', templateVars);
//   })
//   .catch(er => console.log('ERROR',er));

// });


//Renders admin_poll page where the user enters their options
// router.get('/:u_id/:poll_id', (req, res) => {
//   let userObj;
//   if (!(req.session && req.session.user_id) || req.session.user_id !== Number(req.params.u_id) || req.session.poll_id !== Number(req.params.poll_id)) {
//     res.status(403).send('<h3>You must be logged in and have an active poll id.</h3>');
//     return;
//   }
//   return updateURLs(req.params)
//   .then((results) => {

//     console.log(results);
//     userObj = {email : req.session.email, id : req.session.user_id };
//     const templateVars = {user: userObj, poll_id: req.params.poll_id, opNum : results[0].numops}
//     res.render('admin_poll', templateVars)

//   })
//   .catch(er => console.log('ERROR',er))
// });
//User enters title and description of poll, redirects to poll/:id after storing poll in db

// //Posts the entered options
// router.post('/:poll_id', (req, res) => {
//   const options = req.body;
//   console.log(options);
//   const pollID = Number(req.params.poll_id);
//   for (let i = 1; i <= Object.keys(options).length; i++) {
//     const op = `op${i}`;
//     if (options[op]) {
//       insertOptions(options[op], pollID)
//       .catch(e => console.log(e))
//     }
//     if (!options[op]) {
//     }
//   }

//   res.redirect(`/vote/${pollID}`);
// });
module.exports = router;
