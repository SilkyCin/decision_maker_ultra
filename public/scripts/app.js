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
$(document).ready(function() {
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

});

