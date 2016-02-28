$('#button_signup').click(function() {
  $("#form_login").attr("action", "/signup").submit();
});

$('#button_signin').click(function() {
  $("#form_login").attr("action", "/signin").submit();
});
