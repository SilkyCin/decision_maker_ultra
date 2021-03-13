// function performOperation(data, operation, user_id, poll_id) {

//   const perfOp = $.ajax({
//     url : '/admin/' + user_id + '/' + poll_id + '/' + operation,
//     method : 'POST',
//     data : data
//   })
//   perfOp.done((resp) => {
//     console.log(resp);
//   });
//   perfOp.fail((e) => {
//     console.log(e);
//   });

// }
// $(document).ready(function() {
//   $(".opForm").submit(function(e) {
//     e.preventDefault();
//     let data = $(this).serialize();
//     console.log(data);
//     console.log("tiara");
//     let operation = $(this).find("input[type=submit]:focus").attr('class');
//     console.log(operation);
//     let poll_id = $("#poll_id").val();
//     let user_id = $("#user_id").val();
//     performOperation(data, operation, poll_id, user_id);
//   });
// });


