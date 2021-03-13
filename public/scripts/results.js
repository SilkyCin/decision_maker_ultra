

// function postVotes (v, pid) {
//   const vote = $.ajax({
//     url : '/vote/' + pid,
//     method : 'POST',
//     data : v
//   });
//   vote.done((resp) => {
//     console.log(resp);


//   });
//   vote.fail((e) => {
//     console.log(e);
//     //$("#voteMessage").css({'display':'none'});
//   })
// }
// $(document).ready(function(){

//   $("#voterForm").submit(function(e) {
//     e.preventDefault();
//     let v = $("#voterForm").serialize();
//     let pid = $("#poll_id").val();
//     postVotes(v, pid);
//   })
// });
