const postOps = (ops, poll_id, user_id) => {
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
  });
};

$(function() {
  $("#linksMsg").css({'display' : 'none'});
  $("#pollForm").submit(function(e) {
    e.preventDefault();
    const ops = $("#pollForm").serialize();
    let poll_id = $("#poll_id").val();
    let user_id = $("#user_id").val();
    postOps(ops, poll_id, user_id);
  });
});





