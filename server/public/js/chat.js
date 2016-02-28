var socket = io.connect('http://localhost:8080');

socket.emit('join', {username: $('#hidden_username').val()});

socket.on('message', function(data) {
  insertMessage(data.username, data.message);
});

socket.on('new_client', function(data) {
  $('#messages_zone').prepend('<p><em>'+ data.username + ' has joined the channel</em></p>');
});

$('#form_chat').submit(function () {
  var message = $('#message').val();
  checkCommand(message);
  $('#message').val('').focus();
  return false;
});

var insertMessage = function(username, message) {
  var line = '<p><span class="msg-username">';
  line = line + username + '</span>: ';
  line = line + message + '</p>';
  $('#messages_zone').prepend(line);
};

var send = function(message) {
  var username = $('#hidden_username').val();
  socket.emit('message_all', {username: username, message: message});
  insertMessage(username, message);
};
