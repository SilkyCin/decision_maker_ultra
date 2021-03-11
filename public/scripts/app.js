// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// function postUser (email) {

//   const userP = $.ajax({
//     url : '/',
//     method : 'POST',
//     data : email
//   });
//   userP.done((resp) => {

//     console.log("hashsahashashagaggaga");
//     console.log(resp);
//    // $("#userEm").val(resp[0].email);
//     $.ajax({
//       url : '/poll/'+resp[0].id,
//       method : 'GET'
//     });



//   });
//   userP.fail(() => {
//     console.log("Failed!");
//   });

// }
function postOps (ops, poll_id, user_id) {
  const insert = $.ajax({
    url : '/poll/' + user_id + '/' + poll_id,
    method : 'POST',
    data : ops
  });
  insert.done((resp) => {
    console.log(resp);
    $("#linksMsg").slideDown(1000);
    $("#sub").prop('disabled', true);
    $("#pollForm").trigger('reset');
  });
  insert.fail((e) => {
    console.log(e);
    $("#linksMsg").slideUp();
  })
}

$(document).ready(function() {
  $("#linksMsg").css({'display' : 'none'});
  $("#pollForm").submit(function(e) {
    e.preventDefault();
    const ops = $("#pollForm").serialize();
    let poll_id = $("#poll_id").val();
    let user_id = $("#user_id").val();
    postOps(ops, poll_id, user_id);

  })
});
  // $("#mainStuff").css({'display':'none'});
  // $("#showForm").on('click', function () {
  //   $("#mainStuff").css({'display':'block'});
  // });
  // $("#userForm").submit(function (e) {
  //   //e.preventDefault();
  //   //console.log("asdcasdcasd");
  //  // const email = $("#userForm").serialize();
  //   //postUser(email);

  // })




